import React, { Component } from 'react'
import Web3 from 'web3'
import { BrowserRouter as Router } from 'react-router-dom'
import { Logger } from '@oceanprotocol/squid'
import Header from './components/organisms/Header'
import Footer from './components/organisms/Footer'
import Spinner from './components/atoms/Spinner'
import { User } from './context/User'
import { provideOcean } from './ocean'
import Routes from './Routes'
import './styles/global.scss'
import styles from './App.module.scss'

import {
    nodeHost,
    nodePort,
    nodeScheme,
    faucetHost,
    faucetPort,
    faucetScheme
} from './config/config'

const POLL_ACCOUNTS = 1000 // every 1s
const POLL_NETWORK = POLL_ACCOUNTS * 60 // every 1 min

declare global {
    interface Window {
        web3: Web3
        ethereum: any
    }
}

interface AppState {
    isLogged: boolean
    isLoading: boolean
    isWeb3: boolean
    isNile: boolean
    account: string
    balance: {
        eth: number
        ocn: number
    }
    network: string
    web3: Web3
    ocean: any
    requestFromFaucet(): void
    message: string
}

class App extends Component<{}, AppState> {
    private accountsInterval: any = null
    private networkInterval: any = null

    private requestFromFaucet = async () => {
        try {
            const url = `${faucetScheme}://${faucetHost}:${faucetPort}/faucet`
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    address: this.state.account,
                    agent: 'commons'
                })
            })
            return response.json()
        } catch (error) {
            Logger.log('requestFromFaucet', error)
        }
    }

    public state = {
        isLogged: false,
        isLoading: true,
        isWeb3: false,
        isNile: false,
        balance: {
            eth: 0,
            ocn: 0
        },
        network: '',
        web3: new Web3(
            new Web3.providers.HttpProvider(
                `${nodeScheme}://${nodeHost}:${nodePort}`
            )
        ),
        account: '',
        ocean: {} as any,
        requestFromFaucet: this.requestFromFaucet,
        message: 'Connecting to Ocean...'
    }

    public async componentDidMount() {
        await this.bootstrap()

        this.initAccountsPoll()
        this.initNetworkPoll()
    }

    private bootstrap = async () => {
        try {
            //
            // Start with Web3 detection
            //
            this.setState({ message: 'Setting up Web3...' })

            // Modern dapp browsers
            if (window.ethereum) {
                window.web3 = new Web3(window.ethereum)
                this.setState({ isWeb3: true })
            }
            // Legacy dapp browsers
            else if (window.web3) {
                window.web3 = new Web3(window.web3.currentProvider)
                this.setState({ isWeb3: true })
            }
            // Non-dapp browsers
            else {
                this.setState({ isWeb3: false })
            }

            // Modern & legacy dapp browsers
            if (this.state.isWeb3) {
                //
                // Detecting network with window.web3
                //
                let isNile

                await window.web3.eth.net.getId((err, netId) => {
                    if (err) return

                    isNile = netId === 8995
                    const network = isNile ? 'Nile' : netId.toString()

                    if (
                        isNile !== this.state.isNile ||
                        network !== this.state.network
                    ) {
                        this.setState({ isNile, network })
                    }
                })

                if (!isNile) {
                    window.web3 = this.state.web3
                }

                //
                // Provide the Ocean
                //
                this.setState({ message: 'Connecting to Ocean...' })

                const { ocean } = await provideOcean(window.web3)
                this.setState({ ocean, isLoading: false })

                // Set proper network names now that we have Ocean
                this.fetchNetwork()

                // Get accounts
                this.fetchAccounts()
            }
            // Non-dapp browsers
            else {
                this.setState({ message: 'Connecting to Ocean...' })
                const { ocean } = await provideOcean(this.state.web3)
                this.setState({ ocean, isLoading: false })

                this.fetchNetwork()
            }
        } catch (e) {
            // error in bootstrap process
            // show error connecting to ocean
            Logger.log('web3 error', e)
            this.setState({ isLoading: false })
        }
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

    private fetchAccounts = async () => {
        const { ocean, isWeb3, isLogged, isNile } = this.state

        if (isWeb3) {
            // Modern dapp browsers
            if (window.ethereum) {
                if (!isLogged && isNile) {
                    try {
                        await window.ethereum.enable()
                    } catch (error) {
                        // User denied account access...
                        this.accountsInterval = null
                        return
                    }
                }
            }

            const accounts = await ocean.accounts.list()

            if (accounts.length > 0) {
                const account = accounts[0].getId()

                if (account !== this.state.account) {
                    this.setState({ account, isLogged: true })
                }

                const balance = await accounts[0].getBalance()

                if (
                    balance.eth !== this.state.balance.eth ||
                    balance.ocn !== this.state.balance.ocn
                ) {
                    this.setState({ balance })
                }
            } else {
                isLogged !== false &&
                    this.setState({ isLogged: false, account: '' })
            }
        }
    }

    private fetchNetwork = async () => {
        const { ocean, isWeb3 } = this.state

        if (isWeb3) {
            const network = await ocean.keeper.getNetworkName()
            const isNile = network === 'Nile'

            network !== this.state.network && this.setState({ isNile, network })
        }
    }

    public render() {
        return (
            <div className={styles.app}>
                <User.Provider value={this.state}>
                    <Router>
                        <>
                            <Header />

                            <main className={styles.main}>
                                {this.state.isLoading ? (
                                    <div className={styles.loader}>
                                        <Spinner message={this.state.message} />
                                    </div>
                                ) : (
                                    <Routes />
                                )}
                            </main>

                            <Footer />
                        </>
                    </Router>
                </User.Provider>
            </div>
        )
    }
}

export default App
