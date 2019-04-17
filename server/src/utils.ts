import Web3 from 'web3'
import { Ocean } from '@oceanprotocol/squid'
import config from './config/config'

export function getProviders() {
    return new Promise<any>(async (resolve, reject) => {
        const nodeUri = `${config.app.nodeScheme}://${config.app.nodeHost}:${
            config.app.nodePort
        }`
        const aquariusUri = `${config.app.aquariusScheme}://${
            config.app.aquariusHost
        }:${config.app.aquariusPort}`
        const brizoUri = `${config.app.brizoScheme}://${config.app.brizoHost}:${
            config.app.brizoPort
        }`
        const parityUri = `${config.app.parityScheme}://${
            config.app.parityHost
        }:${config.app.parityPort}`
        const secretStoreUri = `${config.app.secretStoreScheme}://${
            config.app.secretStoreHost
        }:${config.app.secretStorePort}`
        const web3 = new Web3(nodeUri)
        const oceanConfig = {
            web3Provider: web3,
            nodeUri,
            aquariusUri,
            brizoUri,
            brizoAddress: config.app.brizoAddress,
            parityUri,
            secretStoreUri,
            verbose: config.app.verbose
        }
        const ocean = await Ocean.getInstance(oceanConfig)
        resolve({
            ocean,
            web3
        })
    })
}
