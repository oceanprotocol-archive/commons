import { Ocean, Logger } from '@oceanprotocol/squid'
import Web3 from 'web3'

import {
    aquariusHost,
    aquariusPort,
    aquariusScheme,
    brizoHost,
    brizoPort,
    brizoScheme,
    brizoAddress,
    faucetHost,
    faucetPort,
    faucetScheme,
    nodeHost,
    nodePort,
    nodeScheme,
    parityHost,
    parityPort,
    parityScheme,
    secretStoreHost,
    secretStorePort,
    secretStoreScheme,
    verbose
} from './config/config'

export async function provideOcean(web3provider: Web3) {
    const nodeUri = `${nodeScheme}://${nodeHost}:${nodePort}`
    const aquariusUri = `${aquariusScheme}://${aquariusHost}:${aquariusPort}`
    const brizoUri = `${brizoScheme}://${brizoHost}:${brizoPort}`
    const parityUri = `${parityScheme}://${parityHost}:${parityPort}`
    const secretStoreUri = `${secretStoreScheme}://${secretStoreHost}:${secretStorePort}`

    const config = {
        web3provider,
        nodeUri,
        aquariusUri,
        brizoUri,
        brizoAddress,
        parityUri,
        secretStoreUri,
        verbose
    }

    const ocean: Ocean = await Ocean.getInstance(config)

    return { ocean }
}

//
// Faucet
//
export interface FaucetResponse {
    success: boolean
    message: string
    trxHash?: string
}

export async function requestFromFaucet(account: string) {
    try {
        const url = `${faucetScheme}://${faucetHost}:${faucetPort}/faucet`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                address: account,
                agent: 'commons'
            })
        })
        return response.json()
    } catch (error) {
        Logger.log('requestFromFaucet', error)
    }
}
