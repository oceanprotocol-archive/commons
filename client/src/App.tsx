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
        startLogin: this.startLogin,
        requestFromFaucet: this.requestFromFaucet,
        message: 'Connecting to Ocean...'
    }

    public async componentDidMount() {
        this.bootstrap()
    }

    private startLoginProcess = async () => {
        try {
            if (this.state.isWeb3 && window.ethereum) {
                await window.ethereum.enable()
                const accounts = await this.state.ocean.accounts.list()
                if (accounts.length > 0) {
                    const balance = await accounts[0].getBalance()
                    this.setState({
                        isLogged: true,
                        balance,
                        account: accounts[0].getId()
                    })
                } else {
                    // not unlocked
                }
            } else {
                // no metamask/mist, show installation guide!
            }
        } catch (e) {
            Logger.log('error logging', e)
            // error in logging process
            // show error
            // rerun bootstrap process?
        }
    }

    private bootstrap = async () => {
        try {
            if (window.web3) {
                const web3 = new Web3(window.web3.currentProvider)
                const { ocean } = await provideOcean(web3)
                const accounts = await ocean.accounts.list()
                const network = await ocean.keeper.getNetworkName()
                const isNile = network === 'Nile'
                if (accounts.length > 0) {
                    const balance = await accounts[0].getBalance()
                    this.setState({
                        isWeb3: true,
                        isLogged: true,
                        isNile,
                        ocean,
                        web3,
                        balance,
                        network,
                        account: accounts[0].getId(),
                        isLoading: false
                    })
                } else {
                    this.setState({
                        isWeb3: true,
                        isNile,
                        ocean,
                        web3,
                        network,
                        isLoading: false
                    })
                }
            } else {
                const { ocean } = await provideOcean(this.state.web3)
                const network = await ocean.keeper.getNetworkName()
                const isNile = network === 'Nile'
                this.setState({
                    isNile,
                    ocean,
                    network,
                    isLoading: false
                })
            }
        } catch (e) {
            // error in bootstrap process
            // show error connecting to ocean
            Logger.log('web3 error', e)
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
