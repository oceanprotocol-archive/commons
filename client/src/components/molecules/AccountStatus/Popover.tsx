import React, { PureComponent } from 'react'
import Account from '../../atoms/Account'
import { User, Market } from '../../../context'
import styles from './Popover.module.scss'

export default class Popover extends PureComponent<{
    forwardedRef?: (ref: HTMLElement | null) => void
    style?: React.CSSProperties
}> {
    public static contextType = User

    public render() {
        const { account, balance, network } = this.context

        return (
            <div
                className={styles.popover}
                ref={this.props.forwardedRef}
                style={this.props.style}
            >
                <div className={styles.popoverInfoline}>
                    <Account />
                </div>

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

                <Market.Consumer>
                    {market => (
                        <div className={styles.popoverInfoline}>
                            {network && !market.networkMatch
                                ? `Please connect to Custom RPC
                                           ${
                                               market.network === 'Pacific'
                                                   ? 'https://pacific.oceanprotocol.com'
                                                   : market.network === 'Nile'
                                                   ? 'https://nile.dev-ocean.com'
                                                   : market.network === 'Duero'
                                                   ? 'https://duero.dev-ocean.com'
                                                   : 'http://localhost:8545'
                                           }`
                                : network && `Connected to ${network} network`}
                        </div>
                    )}
                </Market.Consumer>
            </div>
        )
    }
}
