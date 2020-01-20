import React, { useState, useContext, useEffect, useRef } from 'react'
import { urlq, getObjByKey } from '../../utils/utils'
import { CONNECTIONS } from '../../config'
import { User } from '../../context'
import styles from './NetworkSwitcher.module.scss'

const defaultNetwork = process.env.REACT_APP_OCEAN_NETWORK || 'pacific'
const netUrlParam: string = urlq.get('network') || defaultNetwork
const getNetworkConfig = (network: string) => getObjByKey(CONNECTIONS, network)

export const oceanConfig: any = getNetworkConfig(netUrlParam)

/* NETWORK SWITCHER */
export function NetworkSwitcher() {
    const node: any = useRef()
    const [isToggled, setIsToggled] = useState(false)

    const handleToggle = (e: any) => {
        // avoid click event firing twice
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

    const switchNetwork = (networkName: string): any => {
        // Force page to get refreshed
        window.location.href = `${window.location.origin}?network=${networkName}`
        //userContext.switchNetwork(networkName, getNetworkConfig(networkName))
        setIsToggled(false) // for the case without force page refresh
        return
    }

    return (
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
                <i aria-hidden="true" />
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
                                {networkName === 'spree'
                                    ? `${networkName} (local)`
                                    : networkName}
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    )
}
