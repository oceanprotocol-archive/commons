import Web3 from 'web3'
import { nodeUri } from '../config'
import bip39 from 'bip39'
import HDWalletProvider from 'truffle-hdwallet-provider'

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
        if (await this.isLogged()) {
            const mnemonic = localStorage.getItem('seedphrase') as string
            localStorage.setItem('logType', 'BurnerWallet')
            const provider = new HDWalletProvider(mnemonic, `${nodeUri}`, 0, 1)
            this.web3 = new Web3(provider)
        } else {
            const mnemonic = bip39.generateMnemonic()
            localStorage.setItem('seedphrase', mnemonic)
            localStorage.setItem('logType', 'BurnerWallet')
            const provider = new HDWalletProvider(mnemonic, `${nodeUri}`, 0, 1)
            this.web3 = new Web3(provider)
        }
    }

    public async logout() {
        localStorage.removeItem('seedphrase')
        localStorage.removeItem('logType')
    }

    public getProvider() {
        return this.web3
    }
}
