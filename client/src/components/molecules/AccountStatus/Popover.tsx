import React from 'react'
import { User } from '../../../context/User'
import styles from './Popover.module.scss'

const Popover = ({
    forwardedRef,
    style
}: {
    forwardedRef: (ref: HTMLElement | null) => void
    style: React.CSSProperties
}) => (
    <div className={styles.popover} ref={forwardedRef} style={style}>
        <User.Consumer>
            {states =>
                states.account &&
                states.balance && (
                    <div className={styles.popoverInfoline}>
                        <span
                            className={styles.balance}
                            title={(states.balance.eth / 1e18).toFixed(10)}
                        >
                            <strong>
                                {(states.balance.eth / 1e18)
                                    .toFixed(3)
                                    .slice(0, -1)}
                            </strong>{' '}
                            ETH
                        </span>
                        <span className={styles.balance}>
                            <strong>{states.balance.ocn}</strong> OCEAN
                        </span>
                    </div>
                )
            }
        </User.Consumer>

        <div className={styles.popoverInfoline}>
            <User.Consumer>
                {states =>
                    states.account ? (
                        <span className={styles.address} title={states.account}>
                            {states.account}
                        </span>
                    ) : (
                        <em>No account selected</em>
                    )
                }
            </User.Consumer>
        </div>

        <div className={styles.popoverInfoline}>
            <User.Consumer>
                {states => states.network && states.network}
            </User.Consumer>
        </div>
    </div>
)

export default Popover
