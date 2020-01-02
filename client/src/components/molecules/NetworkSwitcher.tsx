import React, { useState, useContext } from 'react'
import { CONNECTIONS } from '../../config'
import { User } from '../../context'

/* NETWORK SWITCHER */

const urlParams = new URLSearchParams(window.location.search)
const networkFromParam = urlParams.get('network') || 'pacific'

// console.log(Object.keys(CONNECTIONS))

export function NetworkSwitcher() {
    const userContext = useContext(User)
    const switchNetwork = (networkName: string): any => {
        const idx = Object.keys(CONNECTIONS).indexOf(networkName)
        userContext.switchNetwork(networkName, Object.values(CONNECTIONS)[idx]) // TypeScript won't let me access CONNECTIONS[networkName] directly
    }
    return (
        <div>
            <ul>
                {Object.keys(CONNECTIONS).map((networkName, i) => (
                    <li key={i} onClick={() => switchNetwork(networkName)}>
                        {networkName}
                    </li>
                ))}
            </ul>
            <em>{userContext.network}</em>
        </div>
    )
}
