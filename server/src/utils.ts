import Web3 from 'web3'
import { Ocean } from '@oceanprotocol/squid'
import config from './config/config'

const {
    nodeScheme,
    nodeHost,
    nodePort,
    aquariusScheme,
    aquariusHost,
    aquariusPort,
    brizoScheme,
    brizoHost,
    brizoPort,
    parityScheme,
    parityHost,
    parityPort,
    secretStoreScheme,
    secretStoreHost,
    secretStorePort,
    brizoAddress,
    verbose
} = config.app

export function getProviders() {
    return new Promise<any>(async (resolve, reject) => {
        const nodeUri = `${nodeScheme}://${nodeHost}:${nodePort}`
        const aquariusUri = `${aquariusScheme}://${aquariusHost}:${aquariusPort}`
        const brizoUri = `${brizoScheme}://${brizoHost}:${brizoPort}`
        const parityUri = `${parityScheme}://${parityHost}:${parityPort}`
        const secretStoreUri = `${secretStoreScheme}://${secretStoreHost}:${secretStorePort}`
        const web3 = new Web3(nodeUri)
        const oceanConfig = {
            web3Provider: web3,
            nodeUri,
            aquariusUri,
            brizoUri,
            brizoAddress,
            parityUri,
            secretStoreUri,
            verbose
        }
        const ocean = await Ocean.getInstance(oceanConfig)
        resolve({ ocean, web3 })
    })
}
