import Web3 from 'web3'
import { nodeUri } from '../config'
const bip39 = require('bip39')
const HDWalletProvider = require('truffle-hdwallet-provider')

export class BurnerWalletProvider {
    web3: Web3

    constructor() {
        // Default
        this.web3 = null as any
    }

    async isAvaliable() {
        return true
    }

    async isLogged() {
        if (localStorage.getItem('seedphrase') !== null) {
            return true
        }
        return false
    }

    async startLogin() {
        if (await this.isLogged()) {
            const mnemonic = localStorage.getItem('seedphrase') as string
            localStorage.setItem('logType', 'BurnerWallet')
            const provider = new HDWalletProvider(mnemonic, `${nodeUri}`, 0, 1);
            this.web3 = new Web3(provider)
        } else {
            const mnemonic = bip39.generateMnemonic()
            localStorage.setItem('seedphrase', mnemonic)
            localStorage.setItem('logType', 'BurnerWallet')
            const provider = new HDWalletProvider(mnemonic, `${nodeUri}`, 0, 1);
            this.web3 = new Web3(provider)
        }
    }

    async logout() {
        localStorage.removeItem('seedphrase')
        localStorage.removeItem('logType')
    }

    getProvider() {
        return this.web3
    }
 }
