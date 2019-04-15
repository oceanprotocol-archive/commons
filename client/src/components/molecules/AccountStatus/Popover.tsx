import React, { PureComponent } from 'react'
import Dotdotdot from 'react-dotdotdot'
import { User } from '../../../context'
import styles from './Popover.module.scss'

export default class Popover extends PureComponent<{
    forwardedRef: (ref: HTMLElement | null) => void
    style: React.CSSProperties
}> {
    public render() {
        const { account, balance, network, isWeb3, isNile } = this.context
        return (
            <div
                className={styles.popover}
                ref={this.props.forwardedRef}
                style={this.props.style}
            >
                {account && balance && (
                    <div className={styles.popoverInfoline}>
                        <span
                            className={styles.balance}
                            title={(balance.eth / 1e18).toFixed(10)}
                        >
                            <strong>
                                {(balance.eth / 1e18).toFixed(3).slice(0, -1)}
                            </strong>{' '}
                            ETH
                        </span>
                        <span className={styles.balance}>
                            <strong>{balance.ocn}</strong> OCEAN
                        </span>
                    </div>
                )}

                {!isWeb3 ? (
                    <div className={styles.popoverInfoline}>
                        No Web3 detected. Use a browser with MetaMask installed
                        to publish assets.
                    </div>
                ) : (
                    <>
                        <div className={styles.popoverInfoline}>
                            {account ? (
                                <Dotdotdot clamp={1}>
                                    <span className={styles.address}>
                                        {account}
                                    </span>
                                </Dotdotdot>
                            ) : (
                                <em>No account selected</em>
                            )}
                        </div>
                        <div className={styles.popoverInfoline}>
                            {network && !isNile
                                ? 'Please connect to Custom RPC\n https://nile.dev-ocean.com'
                                : network && `Connected to ${network} network`}
                        </div>
                    </>
                )}
            </div>
        )
    }
}

Popover.contextType = User
