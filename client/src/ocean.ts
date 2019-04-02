import { Ocean } from '@oceanprotocol/squid'

import {
    aquariusHost,
    aquariusPort,
    aquariusScheme,
    brizoHost,
    brizoPort,
    brizoScheme,
    brizoAddress,
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
} from './config'

export async function provideOcean() {
    const nodeUri = `${nodeScheme}://${nodeHost}:${nodePort}`
    const aquariusUri = `${aquariusScheme}://${aquariusHost}:${aquariusPort}`
    const brizoUri = `${brizoScheme}://${brizoHost}:${brizoPort}`
    const parityUri = `${parityScheme}://${parityHost}:${parityPort}`
    const secretStoreUri = `${secretStoreScheme}://${secretStoreHost}:${secretStorePort}`

    const config = {
        nodeUri,
        aquariusUri,
        brizoUri,
        brizoAddress,
        parityUri,
        secretStoreUri,
        verbose
    }

    const ocean = await Ocean.getInstance(config)

    return { ocean }
}
