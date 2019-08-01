import Web3 from 'web3'
import { nodeUri } from '../config'
import HDWalletProvider from 'truffle-hdwallet-provider'
import { requestFromFaucet } from '../ocean'
const bip39 = require('bip39') // eslint-disable-line @typescript-eslint/no-var-requires

export class BurnerWalletProvider {
    private web3: Web3

    public constructor() {
        // Default
        this.web3 = null as any
    }

    public async isAvailable() {
        return true
    }

    public async isLogged() {
        if (localStorage.getItem('seedphrase') !== null) {
            return true
        }
        return false
    }

    public async startLogin() {
        let mnemonic
        const isLogged = await this.isLogged()

        if (isLogged) {
            mnemonic = (await localStorage.getItem('seedphrase')) as string
        } else {
            mnemonic = bip39.generateMnemonic()
            localStorage.setItem('seedphrase', mnemonic)
        }

        localStorage.setItem('logType', 'BurnerWallet')
        const provider = new HDWalletProvider(mnemonic, `${nodeUri}`, 0, 1)
        this.web3 = new Web3(provider)
        const accounts = await this.web3.eth.getAccounts()
        const balance = await this.web3.eth.getBalance(accounts[0])

        // fill with Ether if account balance is empty
        balance === '0' && (await requestFromFaucet(provider.addresses[0]))
    }

    public async logout() {
        // localStorage.removeItem('seedphrase')
        localStorage.removeItem('logType')
    }

    public getProvider() {
        return this.web3
    }
}
