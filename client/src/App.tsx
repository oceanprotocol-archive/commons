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
} from './config'

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
    account: string
    balance: {
        eth: number
        ocn: number
    }
    network: string
    web3: Web3
    ocean: {}
    startLogin: () => void
    message: string
}

class App extends Component<{}, AppState> {
    public startLogin = (event?: any) => {
        if (event) {
            event.preventDefault()
        }
        this.startLoginProcess()
    }

    private requestFromFaucet = async () => {
        if (this.state.account !== '') {
            try {
                const response = await fetch(
                    `${faucetScheme}://${faucetHost}:${faucetPort}/faucet`,
                    {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            address: this.state.account,
                            agent: 'commons'
                        })
                    }
                )

                return response.json()
            } catch (error) {
                Logger.log('requestFromFaucet', error)
            }
        } else {
            // no account found
        }
    }

    public state = {
        isLogged: false,
        isLoading: true,
        isWeb3: false,
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
        ocean: {},
        startLogin: this.startLogin,
        requestFromFaucet: this.requestFromFaucet,
        message: 'Connecting to Ocean...'
    }

    public async componentDidMount() {
        this.bootstrap()
    }

    private startLoginProcess = async () => {
        if (window.web3) {
            const web3 = new Web3(window.web3.currentProvider)
            try {
                const accounts = await web3.eth.getAccounts()
                if (accounts.length > 0) {
                    this.setState({
                        isLogged: true,
                        isWeb3: true,
                        account: accounts[0],
                        web3
                    })
                } else {
                    if (accounts.length === 0 && window.ethereum) {
                        await window.ethereum.enable()
                        const newAccounts = await web3.eth.getAccounts()
                        if (newAccounts.length > 0) {
                            this.setState({
                                isLogged: true,
                                isWeb3: true,
                                account: newAccounts[0],
                                web3
                            })
                        } else {
                            // failed to unlock
                        }
                    } else {
                        // no unlock procedure
                    }
                }
            } catch (e) {
                // something went wrong, show error?
            }
        } else {
            // no metamask/mist, show installation guide!
        }
    }

    private bootstrap = async () => {
        if (window.web3) {
            this.setState({ isWeb3: true })
            const web3 = new Web3(window.web3.currentProvider)
            try {
                const accounts = await web3.eth.getAccounts()
                if (accounts.length > 0) {
                    this.setState({
                        isLogged: true,
                        account: accounts[0],
                        web3
                    })
                }
            } catch (e) {
                Logger.log('web3 error', e)
            }
        }
        try {
            const { ocean } = await provideOcean()
            this.setState({
                isLoading: false,
                ocean
            })
            const accounts = await ocean.accounts.list()
            const balance = await accounts[0].getBalance()
            const network = await ocean.keeper.getNetworkName()
            this.setState({ balance, network })
        } catch (e) {
            Logger.log('ocean/balance error', e)
            this.setState({
                isLoading: false
            })
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
