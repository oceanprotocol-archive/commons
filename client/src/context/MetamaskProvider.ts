import Web3 from 'web3'

export class MetamaskProvider {
    web3: Web3

    constructor() {
        // Default
        this.web3 = null as any
        // Modern dapp browsers
        if (window.ethereum) {
            this.web3 = new Web3(window.ethereum)
        }
        // Legacy dapp browsers
        else if (window.web3) {
            this.web3 = new Web3(window.web3.currentProvider)
        }
    }

    async isAvaliable() {
        return this.web3 !== null
    }

    async isLogged() {
        if(this.web3 === null) return false
        if((await this.web3.eth.getAccounts()).length > 0) {
            return true
        }
        return false
    }

    async startLogin() {
        try {
            await window.ethereum.enable()
        } catch (error) {
            return false
        }
    }

    getProvider() {
        return this.web3
    }
 }
