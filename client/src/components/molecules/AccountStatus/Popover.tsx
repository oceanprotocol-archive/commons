import React, { PureComponent } from 'react'
import { User } from '../../../context/User'
import styles from './Popover.module.scss'

export default class Popover extends PureComponent<{
    forwardedRef: (ref: HTMLElement | null) => void
    style: React.CSSProperties
}> {
    public render() {
        const { account, balance, network } = this.context
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

                <div className={styles.popoverInfoline}>
                    {account ? (
                        <span className={styles.address} title={account}>
                            {account}
                        </span>
                    ) : (
                        <em>No account selected</em>
                    )}
                </div>

                <div className={styles.popoverInfoline}>
                    {network && network}
                </div>
            </div>
        )
    }
}

Popover.contextType = User
