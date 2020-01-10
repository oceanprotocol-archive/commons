import React, { PureComponent } from 'react'
import Web3 from 'web3'
import { Ocean, Account, Config } from '@oceanprotocol/squid'
import { User } from '.'
import { provideOcean, requestFromFaucet, FaucetResponse } from '../ocean'
import MarketProvider from './MarketProvider'
import { MetamaskProvider } from './MetamaskProvider'
import { BurnerWalletProvider } from './BurnerWalletProvider'
import { urlq } from '../utils/utils'
import { oceanConfig } from '../components/molecules/NetworkSwitcher'

const { nodeUri } = oceanConfig

const POLL_ACCOUNTS = 1000 // every 1s
const POLL_NETWORK = POLL_ACCOUNTS * 60 // every 1 min
const DEFAULT_WEB3 = new Web3(new Web3.providers.HttpProvider(nodeUri)) // default web3
const networkUrlParam = urlq.get('network') || ''

console.log({ nodeUri })

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
    switchNetwork(network: string, config: Config): any
    requestFromFaucet(account: string): Promise<FaucetResponse>
    loginMetamask(): Promise<any>
    loginBurnerWallet(): Promise<any>
    logoutBurnerWallet(): Promise<any>
    loadOcean: (config: Config) => Promise<Ocean | void>
    message: string
}

export default class UserProvider extends PureComponent<{}, UserProviderState> {
    public state = {
        isLogged: false,
        isBurner: false,
        isWeb3Capable: Boolean(window.web3 || window.ethereum),
        isLoading: true,
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
        switchNetwork: (network: string, config: Config) =>
            this.switchNetwork(network, config),
        loginBurnerWallet: () => this.loginBurnerWallet(),
        logoutBurnerWallet: () => this.logoutBurnerWallet(),
        loadOcean: (config: Config) => this.loadOcean(config),
        message: 'Connecting to Ocean...'
    }

    public async componentDidMount() {
        await this.bootstrap()
    }

    private switchNetwork = async (network: string, config: Config) => {
        this.setState({ network }, async () => {
            this.loadOcean({
                web3Provider: this.state.web3,
                ...config
            })
        })
    }

    private loginMetamask = async () => {
        console.log('loginMetamask')
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
                this.loadOcean({
                    web3Provider: this.state.web3,
                    ...oceanConfig
                })
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
            async () => {
                await this.switchNetwork(networkUrlParam, oceanConfig)
                this.loadOcean({
                    web3Provider: this.state.web3,
                    ...oceanConfig
                })
            }
        )
    }

    private logoutBurnerWallet = async () => {
        const burnerwalletProvider = new BurnerWalletProvider()
        await burnerwalletProvider.logout()
    }

    private accountsInterval: any = null

    private networkInterval: any = null

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

    private loadDefaultWeb3 = async () => {
        this.setState(
            {
                isLogged: false,
                isBurner: false,
                web3: DEFAULT_WEB3
            },
            () => {
                this.loadOcean({
                    web3Provider: this.state.web3,
                    ...oceanConfig
                })
            }
        )
    }

    private loadOcean = async (config: Config) => {
        const { ocean } = await provideOcean({
            web3Provider: this.state.web3,
            ...config
        })
        this.setState({ ocean, isLoading: false }, () => {
            this.initNetworkPoll()
            this.initAccountsPoll()
            this.fetchNetwork()
            this.fetchAccounts()
        })
    }

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
                            this.loadOcean({
                                web3Provider: this.state.web3,
                                ...oceanConfig
                            })
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

            //console.log('fetch', accounts)

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
                !isLogged &&
                    this.setState({
                        isLogged: false,
                        account: ''
                    })
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
        console.log(await ocean.keeper.getNetworkName())
    }

    public render() {
        // console.log(this.state.network)
        return (
            <User.Provider value={this.state}>
                <MarketProvider ocean={this.state.ocean}>
                    {this.props.children}
                </MarketProvider>
            </User.Provider>
        )
    }
}
