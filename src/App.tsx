import React, { Component } from 'react'
import Web3 from 'web3'
import styles from './App.module.scss'
import { User } from './context/User'
import { provideOcean } from './ocean'
import Routes from './Routes'
import './styles/global.scss'

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
        web3: new Web3(
            new Web3.providers.HttpProvider(
                `${nodeScheme}://${nodeHost}:${nodePort}`
            )
        ),
        ocean: {},
        startLogin: this.startLogin
    }

    public async componentDidMount() {
        this.bootstrap()
    }

    public render() {
        return (
            <div className={styles.app}>
                <User.Provider value={this.state}>
                    <Routes />
                </User.Provider>
            </div>
        )
    }

    private startLoginProcess = async () => {
        this.setState({ isLoading: true })
        if (window.web3) {
            const web3 = new Web3(window.web3.currentProvider)
            try {
                const accounts = await web3.eth.getAccounts()
                if (accounts.length > 0) {
                    this.setState({
                        isLogged: true,
                        web3
                    })
                } else {
                    if (accounts.length === 0 && window.ethereum) {
                        await window.ethereum.enable()
                        this.setState({
                            isLogged: true,
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
        this.setState({ isLoading: false })
    }

    private bootstrap = async () => {
        if (window.web3) {
            const web3 = new Web3(window.web3.currentProvider)
            try {
                const accounts = await web3.eth.getAccounts()
                if (accounts.length > 0) {
                    this.setState({
                        isLogged: true,
                        web3
                    })
                }
            } catch (e) {
                // continue with default
            }
        }
        const { ocean } = await provideOcean()
        this.setState({
            isLoading: false,
            ocean
        })
    }
}

export default App
