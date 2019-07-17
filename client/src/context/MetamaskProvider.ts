import Web3 from 'web3'

export class MetamaskProvider {
    private web3: Web3

    public constructor() {
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

    public async isAvailable() {
        return this.web3 !== null
    }

    public async isLogged() {
        if (this.web3 === null) return false
        if ((await this.web3.eth.getAccounts()).length > 0) {
            return true
        }
        return false
    }

    public async startLogin() {
        try {
            await window.ethereum.enable()
            localStorage.setItem('logType', 'Metamask')
        } catch (error) {
            return false
        }
    }

    public async logout() {
        localStorage.removeItem('logType')
        // reload page?
    }

    public getProvider() {
        return this.web3
    }
}
