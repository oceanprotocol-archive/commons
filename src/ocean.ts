import {
    Ocean
} from '@oceanprotocol/squid/dist/node/squid'

import {
    address,
    aquariusHost,
    aquariusPort,
    aquariusScheme,
    brizoHost,
    brizoPort,
    brizoScheme,
    nodeHost,
    nodePort,
    nodeScheme,
    parityHost,
    parityPort,
    parityScheme,
    password,
    secretStoreHost,
    secretStorePort,
    secretStoreScheme,
    threshold,
    verbose
} from '../config/ocean'

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
        parityUri,
        secretStoreUri,
        threshold,
        password,
        address,
        verbose
    }

    const ocean = await Ocean.getInstance(config)

    return { ocean }
}
