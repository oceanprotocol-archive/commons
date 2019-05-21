import Web3 from 'web3'
import { nodeHost, nodePort, nodeScheme } from '../config'
import bip39 from 'bip39'
const HDWalletProvider = require('truffle-hdwallet-provider')

export class ZeroWalletProvider {
    web3: Web3

    constructor() {
        // Default
        this.web3 = null as any
    }

    async isLogged() {
        if (localStorage.getItem('seedphrase') !== null) {
            return true
        }
        return false
    }

    async restoreStoredLogin() {
        const mnemonic = localStorage.getItem('seedphrase') as string
        localStorage.setItem('seedphrase', mnemonic)
        const provider = new HDWalletProvider(mnemonic, `${nodeScheme}://${nodeHost}:${nodePort}`, 0, 1);
        this.web3 = new Web3(provider)
    }

    async createLogin() {
        const mnemonic = bip39.generateMnemonic()
        localStorage.setItem('seedphrase', mnemonic)
        const provider = new HDWalletProvider(mnemonic, `${nodeScheme}://${nodeHost}:${nodePort}`, 0, 1);
        this.web3 = new Web3(provider)
    }

    async restoreLogin(mnemonic: string) {
        localStorage.setItem('seedphrase', mnemonic)
        const provider = new HDWalletProvider(mnemonic, `${nodeScheme}://${nodeHost}:${nodePort}`, 0, 1);
        this.web3 = new Web3(provider)
    }

    getProvider() {
        return this.web3
    }
 }
