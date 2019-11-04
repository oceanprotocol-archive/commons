import React, { PureComponent } from 'react'
import Web3 from 'web3'
import { Ocean, Account } from '@oceanprotocol/squid'
import { User } from '.'
import { provideOcean, requestFromFaucet, FaucetResponse, airdropOceanTokens } from '../ocean'
import { requestAccessTo3box } from '../3box'
import { nodeUri } from '../config'
import MarketProvider from './MarketProvider'
import { MetamaskProvider } from './MetamaskProvider'
import { BurnerWalletProvider } from './BurnerWalletProvider'

const POLL_ACCOUNTS = 1000 // every 1s
const POLL_NETWORK = POLL_ACCOUNTS * 60 // every 1 min
const DEFAULT_WEB3 = new Web3(new Web3.providers.HttpProvider(nodeUri)) // default web3

interface UserProviderState {
    isLogged: boolean
    isBurner: boolean
    isWeb3Capable: boolean
    isLoading: boolean
    account: string
    balance: {
        eth: number
        ocn: number
    }
    network: string
    web3: Web3
    ocean: Ocean
    box: any
    openWallet(): Promise<void>
    requestFromFaucet(account: string): Promise<FaucetResponse>
    airdropOceanTokens(): Promise<any>
    loginMetamask(): Promise<any>
    loginBurnerWallet(): Promise<any>
    logoutBurnerWallet(): Promise<any>
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
        this.showLoadingMessage('Connecting to a Burner Wallet...')
        const burnerwalletProvider = new BurnerWalletProvider()
        await burnerwalletProvider.startLogin()
        const web3 = burnerwalletProvider.getProvider()
        this.hideLoadingMessage()
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

    private logoutBurnerWallet = async () => {
        const burnerwalletProvider = new BurnerWalletProvider()
        await burnerwalletProvider.logout()
    }

    private airdropOceanTokens = async () => {
        const { ocean } = this.state
        const accounts = await ocean.accounts.list()
        console.log('airdropOceanTokens', ocean, accounts)

        if (accounts.length > 0) {
            await airdropOceanTokens(ocean, accounts[0])
            await this.fetchBalance(accounts[0])
        }
    }

    public state = {
        isLogged: false,
        isBurner: false,
        isWeb3Capable: Boolean(window.web3 || window.ethereum),
        isLoading: false,
        balance: {
            eth: 0,
            ocn: 0
        },
        network: '',
        web3: DEFAULT_WEB3,
        account: '',
        ocean: {} as any,
        box: {} as any,
        openWallet: () => this.openWallet(),
        requestFromFaucet: () => requestFromFaucet(''),
        airdropOceanTokens: () => this.airdropOceanTokens(),
        loginMetamask: () => this.loginMetamask(),
        loginBurnerWallet: () => this.loginBurnerWallet(),
        logoutBurnerWallet: () => this.logoutBurnerWallet(),
        message: 'Loading Marketplace...'
    }

    private accountsInterval: any = null

    private networkInterval: any = null

    private defaultMessage: string = 'Loading Marketplace...'

    // 0
    public async componentDidMount() {
        // await this.bootstrap()
    }

    private async openWallet() {
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

    private showLoadingMessage(message: string) {
        this.setState({ isLoading: true, message })
    }

    private hideLoadingMessage() {
        this.setState({ isLoading: false, message: this.defaultMessage })
    }

    private loadDefaultWeb3 = async () => {
        this.setState(
            {
                isLogged: false,
                isBurner: false,
                web3: DEFAULT_WEB3
            },
            () => {
                this.loadOcean()
            }
        )
    }

    // 2
    private loadOcean = async () => {
        this.showLoadingMessage('Connecting to the Network...')
        const { ocean } = await provideOcean(this.state.web3)
        this.setState({ ocean }, () => {
            this.hideLoadingMessage()
            this.initNetworkPoll()
            this.initAccountsPoll()
            this.fetchNetwork()
            this.fetchAccounts()
        })
    }

    // after fetchAccounts
    private load3box = async () => {
        this.showLoadingMessage('Getting 3box Profile...')
        const { account, web3 } = this.state
        console.log('===ACCOUNT===', account, web3)
        const box = await requestAccessTo3box(account, web3)
        console.log('===3box===', box)
        this.setState({ box })
        this.hideLoadingMessage()
    }

    // 1
    private bootstrap = async () => {
        const logType = localStorage.getItem('logType')
        const metamaskProvider = new MetamaskProvider()

        switch (logType) {
            case 'Metamask':
                if (
                    (await metamaskProvider.isAvailable()) &&
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
                    this.loadDefaultWeb3()
                }
                break
            case 'BurnerWallet':
                this.loginBurnerWallet()
                break
            default:
                this.loginBurnerWallet()
                break
        }
    }

    private fetchAccounts = async () => {
        const { ocean, isLogged } = this.state

        if (isLogged) {
            let accounts

            // Modern dapp browsers
            if (window.ethereum && !isLogged) {
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
                    }, () => this.load3box())

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
        let network = 'Unknown'
        if (ocean.keeper) {
            network = await ocean.keeper.getNetworkName()
        }
        network !== this.state.network && this.setState({ network })
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
