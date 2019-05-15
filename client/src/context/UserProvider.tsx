import React, { PureComponent } from 'react'
import Web3 from 'web3'
import { Logger, Ocean, Account } from '@oceanprotocol/squid'
import { User } from '.'
import { provideOcean, requestFromFaucet, FaucetResponse } from '../ocean'
import { nodeHost, nodePort, nodeScheme } from '../config'

const POLL_ACCOUNTS = 1000 // every 1s
const POLL_NETWORK = POLL_ACCOUNTS * 60 // every 1 min

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
    isLoading: boolean
    isWeb3: boolean
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
    unlockAccounts(): Promise<any>
    message: string
}

export default class UserProvider extends PureComponent<{}, UserProviderState> {
    private unlockAccounts = async () => {
        try {
            await window.ethereum.enable()
        } catch (error) {
            // User denied account access...
            return null
        }
    }

    public state = {
        isLogged: false,
        isLoading: true,
        isWeb3: false,
        isOceanNetwork: false,
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
        requestFromFaucet: () => requestFromFaucet(''),
        unlockAccounts: () => this.unlockAccounts(),
        message: 'Connecting to Ocean...'
    }

    private accountsInterval: any = null
    private networkInterval: any = null

    public async componentDidMount() {
        await this.bootstrap()

        this.initAccountsPoll()
        this.initNetworkPoll()
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

    private getWeb3 = () => {
        // Modern dapp browsers
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            return window.web3
        }
        // Legacy dapp browsers
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
            return window.web3
        }
        // Non-dapp browsers
        else {
            return null
        }
    }

    private bootstrap = async () => {
        try {
            //
            // Start with Web3 detection only
            //
            this.setState({ message: 'Setting up Web3...' })
            let web3 = await this.getWeb3()

            web3
                ? this.setState({ isWeb3: true })
                : this.setState({ isWeb3: false })

            // Modern & legacy dapp browsers
            if (web3 && this.state.isWeb3) {
                //
                // Detecting network with window.web3
                //
                let isOceanNetwork

                await window.web3.eth.net.getId((err, netId) => {
                    if (err) return

                    const isNile = netId === 8995
                    const isDuero = netId === 2199
                    const isSpree = netId === 8996

                    isOceanNetwork = isNile || isDuero || isSpree

                    const network = isNile
                        ? 'Nile'
                        : isDuero
                        ? 'Duero'
                        : netId.toString()

                    if (
                        isOceanNetwork !== this.state.isOceanNetwork ||
                        network !== this.state.network
                    ) {
                        this.setState({ isOceanNetwork, network })
                    }
                })

                if (!isOceanNetwork) {
                    web3 = this.state.web3 // eslint-disable-line
                }

                //
                // Provide the Ocean
                //
                this.setState({ message: 'Connecting to Ocean...' })

                const { ocean } = await provideOcean(web3)
                this.setState({ ocean, message: 'Getting accounts...' })

                // Get accounts
                await this.fetchAccounts()

                this.setState({ isLoading: false, message: '' })
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
            Logger.error('web3 error', e.message)
            this.setState({ isLoading: false })
        }
    }

    private fetchAccounts = async () => {
        const { ocean, isWeb3, isLogged, isOceanNetwork } = this.state

        if (isWeb3) {
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
        const { ocean, isWeb3 } = this.state

        if (isWeb3) {
            const network = await ocean.keeper.getNetworkName()
            const isNile = network === 'Nile'
            const isDuero = network === 'Duero'
            const isSpree = network === 'Spree'
            const isOceanNetwork = isNile || isDuero || isSpree

            network !== this.state.network &&
                this.setState({ isOceanNetwork, network })
        }
    }

    public render() {
        return (
            <User.Provider value={this.state}>
                {this.props.children}
            </User.Provider>
        )
    }
}
