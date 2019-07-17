import { Ocean, Logger } from '@oceanprotocol/squid'
import Web3 from 'web3'

import {
    aquariusUri,
    brizoUri,
    brizoAddress,
    faucetUri,
    nodeUri,
    secretStoreUri,
    verbose
} from './config'

export async function provideOcean(web3Provider: Web3) {
    const config = {
        web3Provider,
        nodeUri,
        aquariusUri,
        brizoUri,
        brizoAddress,
        secretStoreUri,
        verbose
    }
    const ocean: any = await Ocean.getInstance(config)
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
        const url = `${faucetUri}/faucet`
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
        Logger.error('requestFromFaucet', error.message)
    }
}
