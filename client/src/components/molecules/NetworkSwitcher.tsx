import React, { useState, useContext, useEffect, useRef } from 'react'
import { urlq } from '../../utils/utils'
import { CONNECTIONS } from '../../config'
import { User } from '../../context'
import styles from './NetworkSwitcher.module.scss'

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
    const node: any = useRef()
    const [isToggled, setIsToggled] = useState(false)

    const handleToggle = (e: any) => {
        if (e.which === 1) {
            const isClickedInside = node.current.contains(e.target)
            setIsToggled(isClickedInside)
        }
    }

    useEffect(() => {
        // Handle click outside to collapse Network switcher dropdown
        // listener when mounted
        document.addEventListener('mousedown', handleToggle)
        // return function when unmounted
        return () => {
            document.removeEventListener('mousedown', handleToggle)
        }
    }, [handleToggle])

    const { network, isBurner } = useContext(User)

    console.log(isBurner)

    const switchNetwork = (networkName: string): any => {
        // Force page to get refreshed
        window.location.href = `${window.location.origin}?network=${networkName}`
        //userContext.switchNetwork(networkName, getNetworkConfig(networkName))
        setIsToggled(false) // for the case without force page refresh
        return
    }

    return !isBurner ? null : (
        <div
            ref={node}
            className={`${styles.networkListWrapper} ${
                isToggled ? styles.on : ''
            }`}
        >
            <button
                className={styles.networkSwitchButton}
                onClick={e => handleToggle(e)}
            >
                <span>{network ? network : 'fetching ...'}</span>
                <i />
            </button>
            <ul className={styles.networkList}>
                {Object.keys(CONNECTIONS)
                    .filter(
                        networkName =>
                            network.toUpperCase() !== networkName.toUpperCase()
                    )
                    .map((networkName, i) => (
                        <li key={networkName}>
                            <button
                                className={styles.listButton}
                                onClick={() => switchNetwork(networkName)}
                            >
                                {networkName}
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    )
}
