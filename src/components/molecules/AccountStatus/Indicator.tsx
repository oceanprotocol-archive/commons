import React from 'react'
import cx from 'classnames'
import { User } from '../../../context/User'
import styles from './Indicator.module.scss'

const Indicator = ({
    className,
    showPopover,
    hidePopover
}: {
    className?: string
    showPopover: any
    hidePopover: any
}) => (
    <div
        className={cx(styles.status, className)}
        onMouseOver={showPopover}
        onMouseOut={hidePopover}
    >
        <User.Consumer>
            {states =>
                !states.isWeb3 ? (
                    <span className={styles.statusIndicator} />
                ) : !states.isLogged ? (
                    <span className={styles.statusIndicatorCloseEnough} />
                ) : states.isLogged ? (
                    <span className={styles.statusIndicatorActive} />
                ) : null
            }
        </User.Consumer>
    </div>
)

export default Indicator
