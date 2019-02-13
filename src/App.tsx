import React, { Component } from 'react'
import Web3 from 'web3'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Spinner from './components/atoms/Spinner'
import { User } from './context/User'
import { provideOcean } from './ocean'
import Routes from './Routes'
import './styles/global.scss'
import styles from './App.module.scss'

import { nodeHost, nodePort, nodeScheme } from './config'

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
    web3: Web3
    ocean: {}
    startLogin: () => void
}

class App extends Component<{}, AppState> {
    public startLogin = (event?: any) => {
        if (event) {
            event.preventDefault()
        }
        this.startLoginProcess()
    }

    public state = {
        isLogged: false,
        isLoading: true,
        isWeb3: false,
        web3: new Web3(
            new Web3.providers.HttpProvider(
                `${nodeScheme}://${nodeHost}:${nodePort}`
            )
        ),
        account: '',
        ocean: {},
        startLogin: this.startLogin
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
                        this.setState({
                            isLogged: true,
                            isWeb3: true,
                            account: accounts[0],
                            web3
                        })
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
                // continue with default
            }
        }
        try {
            const { ocean } = await provideOcean()
            this.setState({
                isLoading: false,
                ocean
            })
        } catch (e) {
            // show loading error / unable to initialize ocean
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
                                        <Spinner message="Connecting to Ocean..." />
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
