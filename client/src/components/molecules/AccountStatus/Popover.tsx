import React, { PureComponent } from 'react'
import Account from '../../atoms/Account'
import { User } from '../../../context'
import styles from './Popover.module.scss'

export default class Popover extends PureComponent<{
    forwardedRef: (ref: HTMLElement | null) => void
    style: React.CSSProperties
}> {
    public render() {
        const { account, balance, network, isOceanNetwork } = this.context

        return (
            <div
                className={styles.popover}
                ref={this.props.forwardedRef}
                style={this.props.style}
            >
                {
                    <>
                        <div className={styles.popoverInfoline}>
                            <Account account={account} />
                        </div>

                        {account && balance && (
                            <div className={styles.popoverInfoline}>
                                <span
                                    className={styles.balance}
                                    title={(balance.eth / 1e18).toFixed(10)}
                                >
                                    <strong>
                                        {(balance.eth / 1e18)
                                            .toFixed(3)
                                            .slice(0, -1)}
                                    </strong>{' '}
                                    ETH
                                </span>
                                <span className={styles.balance}>
                                    <strong>{balance.ocn}</strong> OCEAN
                                </span>
                            </div>
                        )}

                        <div className={styles.popoverInfoline}>
                            {network && !isOceanNetwork
                                ? 'Please connect to Custom RPC\n https://pacific.oceanprotocol.com'
                                : network && `Connected to ${network} network`}
                        </div>
                    </>
                }
            </div>
        )
    }
}

Popover.contextType = User
