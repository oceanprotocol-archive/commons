import React, { useState, useContext, useEffect } from 'react'
import { urlq } from '../../utils/utils'
import { CONNECTIONS } from '../../config'
import { User } from '../../context'

const networkUrlParam = urlq.get('network') || ''

const getNetworkConfig = (network: string) => {
    const index = Object.keys(CONNECTIONS).indexOf(network)
    // TypeScript doesn't let access CONNECTIONS[networkName] directly
    return index !== -1
        ? Object.values(CONNECTIONS)[index]
        : CONNECTIONS.pacific // Use default config in case of mispelled URL params or
}

export const oceanConfig =
    networkUrlParam !== ''
        ? getNetworkConfig(networkUrlParam)
        : getNetworkConfig('pacific')

/* NETWORK SWITCHER */
export function NetworkSwitcher() {
    /*    
    useEffect(() => {
        if (networkUrlParam !== '') {
            switchNetwork(networkUrlParam)
        }
    }, []) 
    */

    const userContext = useContext(User)

    const switchNetwork = (networkName: string): any =>
        // Force page to get refreshed
        (window.location.href = `${window.location.origin}?network=${networkName}`)
    //userContext.switchNetwork(networkName, getNetworkConfig(networkName))

    return (
        <div>
            <ul>
                {Object.keys(CONNECTIONS).map((networkName, i) => (
                    <li
                        key={i}
                        onClick={() => switchNetwork(networkName)}
                        style={{
                            cursor: 'pointer',
                            color:
                                userContext.network.toUpperCase() ===
                                networkName.toUpperCase()
                                    ? 'red'
                                    : ''
                        }}
                    >
                        <span
                            style={{
                                textTransform: 'capitalize'
                            }}
                        >
                            {networkName}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
