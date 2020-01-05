import Web3 from "web3"

const StandardBounties = require('./contracts/StandardBounties.json')

const NetworkID: { [name: string]: string } = {
	"Spree": "8996",
	"Nile": "8995",
	"Pacific": "846353"

}

const validNetwork = async (web3: Web3, network: string) => {
	const networks = Object.keys(NetworkID)
	const networkId = await web3.eth.net.getId()
	return networks.includes(network) && NetworkID[network] === networkId.toString()
}

const contractDeployed = (contract: any, networkId: string) => {
	const networks = contract.networks ? Object.keys(contract.networks):[]
	return networks.includes(networkId)
}

interface TxParams {
	from: string
	gasPrice?: string
	gas?: string
	value?: string
}

const sendTx = async (method: any, options:TxParams) =>
	new Promise<any>(async (resolve, reject) => {
		method.send(options, (error: any, txHash: string) => error && reject(error) )
			.on('receipt', (receipt: any) => {
				console.log('Tx receipt', receipt)
				resolve(receipt)
		})
	})

const publishBounty = async (web3: Web3, params: Array<any>) => {
	const networkId = (await web3.eth.net.getId()).toString()
	if(contractDeployed(StandardBounties, networkId)) {
		const accounts = await web3.eth.getAccounts()
		const contract = new web3.eth.Contract(StandardBounties.abi, StandardBounties.networks[networkId].address)
		const gasEstimate = await contract.methods.issueBounty(...params).estimateGas({from: accounts[0]})
		console.log('gasEstimate', gasEstimate)
		return await sendTx(contract.methods.issueBounty(...params), {from: accounts[0], gas: gasEstimate})
	} else {
		throw new Error("You're connected to the wrong network")
	}

}

export {
	validNetwork,
	contractDeployed,
	publishBounty
}
