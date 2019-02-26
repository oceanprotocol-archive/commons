import React from 'react'
import { User } from '../../../context/User'
import Faucet from './Faucet'
import styles from './Popover.module.scss'

const Popover = () => (
    <div className={styles.popover}>
        <div className={styles.accountName}>
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
            Network: &nbsp;<strong>{''}</strong>
        </div>
        <div className={styles.popoverInfoline}>
            <Faucet />
        </div>
    </div>
)

export default Popover
