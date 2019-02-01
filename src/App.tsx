import React, { Component } from 'react'
import Web3 from 'web3'
import styles from './App.module.scss'
import { User } from './context/User'
import { provideOcean } from './ocean'
import Routes from './Routes'
import './styles/global.scss'

import {
    nodeHost,
    nodePort,
    nodeScheme
} from './config'

interface IState {
    isLogged: boolean,
    web3: any,
    ocean: {},
    startLogin: () => void,
}

class App extends Component<{},IState> {
    public startLogin: () => void
    constructor(props: {}) {
        super(props)
        this.startLogin = (event?) => {
            if (event) {
                event.preventDefault()
            }
            this.startLoginProcess()
        }
        this.state = {
            isLogged: false,
            web3: {},
            ocean: {},
            startLogin: this.startLogin,
        }
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
        if((window as any).web3) {
            const web3 = new Web3((window as any).web3.currentProvider)
            try {
                const accounts = await web3.eth.getAccounts()
                if (accounts.length === 0 && (window as any).ethereum) {
                    await (window as any).ethereum.enable()
                    const { ocean } = await provideOcean()
                    this.setState(state => ({
                        isLogged: true,
                        web3,
                        ocean
                    }))
                } else {
                    this.setState(state => ({
                        isLogged: true,
                        web3
                    }))
                }
            } catch (e) {
                this.setDefaultProvider()
            }
        } else {
            this.setDefaultProvider()
        }
    }

    private bootstrap = async () => {
        if((window as any).web3) {
            const web3 = new Web3((window as any).web3.currentProvider)
            try {
                const accounts = await web3.eth.getAccounts()
                if (accounts.length > 0) {
                    const { ocean } = await provideOcean()
                    this.setState(state => ({
                        isLogged: true,
                        web3,
                        ocean
                    }))
                }
            } catch (e) {
                this.setDefaultProvider()
            }
        } else {
            this.setDefaultProvider()
        }
    }

    private setDefaultProvider = () => {
        this.setState(state => ({
            isLogged: false,
            web3: new Web3(new Web3.providers.HttpProvider(`${nodeScheme}://${nodeHost}:${nodePort}`))
        }))
    }
}

export default App
