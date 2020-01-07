import React, { useState, useContext, useEffect } from 'react'
import { urlq } from '../../utils/utils'
import {
    aquariusUri,
    brizoUri,
    brizoAddress,
    nodeUri,
    secretStoreUri,
    verbose,
    CONNECTIONS
} from '../../config'
import { User } from '../../context'

const networkUrlParam = urlq.get('network') || ''
const defaultNetworkConfig = {
    nodeUri,
    aquariusUri,
    brizoUri,
    brizoAddress,
    secretStoreUri,
    verbose
}

const getNetworkConfig = (network: string) => {
    console.log(network)
    const index = Object.keys(CONNECTIONS).indexOf(network)
    // TypeScript doesn't let access CONNECTIONS[networkName] directly
    return index !== -1
        ? Object.values(CONNECTIONS)[index]
        : CONNECTIONS.pacific // Use defaul config in case of mispelled URL params or
}

export const oceanConfig =
    networkUrlParam !== ''
        ? getNetworkConfig(networkUrlParam)
        : defaultNetworkConfig

/* NETWORK SWITCHER */
export function NetworkSwitcher() {
    const userContext = useContext(User)

    const switchNetwork = (networkName: string): any => {
        const idx = Object.keys(CONNECTIONS).indexOf(networkName)
        userContext.switchNetwork(networkName, getNetworkConfig(networkName))
    }

    useEffect(() => {
        if (networkUrlParam !== '') {
            switchNetwork(networkUrlParam)
        }
    }, [])

    return (
        <div>
            <ul>
                {Object.keys(CONNECTIONS).map((networkName, i) => (
                    <li
                        key={i}
                        style={{ cursor: 'pointer' }}
                        onClick={() => switchNetwork(networkName)}
                    >
                        <span style={{ textTransform: 'capitalize' }}>
                            {networkName}
                        </span>
                    </li>
                ))}
            </ul>
            <em style={{ textTransform: 'capitalize' }}>
                {userContext.network}
            </em>
        </div>
    )
}
