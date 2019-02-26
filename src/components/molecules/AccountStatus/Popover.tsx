import React from 'react'
import { User } from '../../../context/User'
import Faucet from './Faucet'
import styles from './Popover.module.scss'

const Popover = ({ togglePopover }: { togglePopover: any }) => (
    <div
        className={styles.popover}
        onMouseOver={togglePopover}
        onMouseOut={togglePopover}
    >
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
            Network: <strong>&nbsp; Fake Network Name</strong>
            {/* Network:
            <User.Consumer>
                {states => states.network && <strong>{states.network}</strong>}
            </User.Consumer> */}
        </div>
        <div className={styles.popoverInfoline}>
            <span className={styles.balance} title="Fake data">
                <strong>30</strong> ETH
            </span>
            {/* <span className={styles.balance} title={(eth / 1e18).toFixed(10)}>
                    <strong>{(eth / 1e18).toFixed(3).slice(0, -1)}</strong> ETH
                </span> */}
            <span className={styles.balance}>
                {/* <strong>{ocn}</strong> OCEAN */}
                <strong>2474290</strong> OCEAN
            </span>
        </div>
        <div className={styles.popoverInfoline}>
            <Faucet />
        </div>
    </div>
)

export default Popover
