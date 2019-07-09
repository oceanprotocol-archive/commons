import React, { PureComponent } from 'react'
import Web3 from 'web3'
import { Ocean, Account } from '@oceanprotocol/squid'
import { User } from '.'
import { provideOcean, requestFromFaucet, FaucetResponse } from '../ocean'
import { nodeUri } from '../config'
import MarketProvider from './MarketProvider'
import { MetamaskProvider } from './MetamaskProvider'
import { BurnerWalletProvider } from './BurnerWalletProvider'

const POLL_ACCOUNTS = 1000 // every 1s
const POLL_NETWORK = POLL_ACCOUNTS * 60 // every 1 min
const DEFAULT_WEB3 = new Web3(new Web3.providers.HttpProvider(nodeUri)) // default web3

// taken from
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/web3/providers.d.ts
interface JsonRPCRequest {
    jsonrpc: string
    method: string
    params: any[]
    id: number
}

interface JsonRPCResponse {
    jsonrpc: string
    id: number
    result?: any
    error?: string
}

interface Callback<ResultType> {
    (error: Error): void
    (error: null, val: ResultType): void
}

declare global {
    interface Window {
        web3: Web3
        ethereum: {
            enable(): void
            send(
                payload: JsonRPCRequest,
                callback: Callback<JsonRPCResponse>
            ): any
        }
    }
}

interface UserProviderState {
    isLogged: boolean
    isBurner: boolean
    isLoading: boolean
    isOceanNetwork: boolean
    account: string
    balance: {
        eth: number
        ocn: number
    }
    network: string
    web3: Web3
    ocean: Ocean
    requestFromFaucet(account: string): Promise<FaucetResponse>
    loginMetamask(): Promise<any>
    loginBurnerWallet(): Promise<any>
    message: string
}

export default class UserProvider extends PureComponent<{}, UserProviderState> {
    private loginMetamask = async () => {
        const metamaskProvider = new MetamaskProvider()
        await metamaskProvider.startLogin()
        const web3 = metamaskProvider.getProvider()
        this.setState(
            {
                isLogged: true,
                isBurner: false,
                web3
            },
            () => {
                this.loadOcean()
            }
        )
    }

    private loginBurnerWallet = async () => {
        const burnerwalletProvider = new BurnerWalletProvider()
        await burnerwalletProvider.startLogin()
        const web3 = burnerwalletProvider.getProvider()
        this.setState(
            {
                isLogged: true,
                isBurner: true,
                web3
            },
            () => {
                this.loadOcean()
            }
        )
    }

    public state = {
        isLogged: false,
        isBurner: false,
        isLoading: true,
        isOceanNetwork: false,
        balance: {
            eth: 0,
            ocn: 0
        },
        network: '',
        web3: DEFAULT_WEB3,
        account: '',
        ocean: {} as any,
        requestFromFaucet: () => requestFromFaucet(''),
        loginMetamask: () => this.loginMetamask(),
        loginBurnerWallet: () => this.loginBurnerWallet(),
        message: 'Connecting to Ocean...'
    }

    private accountsInterval: any = null
    private networkInterval: any = null

    public async componentDidMount() {
        await this.bootstrap()
    }

    private initAccountsPoll() {
        if (!this.accountsInterval) {
            this.accountsInterval = setInterval(
                this.fetchAccounts,
                POLL_ACCOUNTS
            )
        }
    }

    private initNetworkPoll() {
        if (!this.networkInterval) {
            this.networkInterval = setInterval(this.fetchNetwork, POLL_NETWORK)
        }
    }

    private loadOcean = async () => {
        const { ocean } = await provideOcean(this.state.web3)
        this.setState({ ocean, isLoading: false }, () => {
            this.initNetworkPoll()
            this.initAccountsPoll()
            this.fetchNetwork()
            this.fetchAccounts()
        })
    }

    private bootstrap = async () => {
        const logType = localStorage.getItem('logType')
        switch (logType) {
            case 'Metamask':
                const metamaskProvider = new MetamaskProvider()
                if (
                    (await metamaskProvider.isAvaliable()) &&
                    (await metamaskProvider.isLogged())
                ) {
                    const web3 = metamaskProvider.getProvider()
                    this.setState(
                        {
                            isLogged: true,
                            web3
                        },
                        () => {
                            this.loadOcean()
                        }
                    )
                } else {
                    this.loadOcean()
                }
                break
            case 'BurnerWallet':
                const burnerWalletProvider = new BurnerWalletProvider()
                if (await burnerWalletProvider.isLogged()) {
                    await burnerWalletProvider.startLogin()
                    this.setState(
                        {
                            isLogged: true,
                            isBurner: true,
                            web3: burnerWalletProvider.getProvider()
                        },
                        () => {
                            this.loadOcean()
                        }
                    )
                } else {
                    this.loginBurnerWallet()
                }
                break
            default:
                this.loginBurnerWallet()
                break
        }
    }

    private fetchAccounts = async () => {
        const { ocean, isLogged, isOceanNetwork } = this.state

        if (isLogged) {
            let accounts

            // Modern dapp browsers
            if (window.ethereum && !isLogged && isOceanNetwork) {
                // simply set to empty, and have user click a button somewhere
                // to initiate account unlocking
                accounts = []

                // alternatively, automatically prompt for account unlocking
                // await this.unlockAccounts()
            }

            accounts = await ocean.accounts.list()

            if (accounts.length > 0) {
                const account = await accounts[0].getId()

                if (account !== this.state.account) {
                    this.setState({
                        account,
                        isLogged: true,
                        requestFromFaucet: () => requestFromFaucet(account)
                    })

                    await this.fetchBalance(accounts[0])
                }
            } else {
                !isLogged && this.setState({ isLogged: false, account: '' })
            }
        }
    }

    private fetchBalance = async (account: Account) => {
        const balance = await account.getBalance()
        const { eth, ocn } = balance
        if (eth !== this.state.balance.eth || ocn !== this.state.balance.ocn) {
            this.setState({ balance: { eth, ocn } })
        }
    }

    private fetchNetwork = async () => {
        const { ocean } = this.state

        const network = await ocean.keeper.getNetworkName()
        const isPacific = network === 'Pacific'
        const isNile = network === 'Nile'
        const isDuero = network === 'Duero'
        const isSpree = network === 'Spree'
        const isOceanNetwork = isPacific || isNile || isDuero || isSpree

        network !== this.state.network &&
                this.setState({ isOceanNetwork, network })
    }

    public render() {
        return (
            <User.Provider value={this.state}>
                <MarketProvider ocean={this.state.ocean}>
                    {this.props.children}
                </MarketProvider>
            </User.Provider>
        )
    }
}
