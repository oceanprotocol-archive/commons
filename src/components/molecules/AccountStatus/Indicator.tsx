import React from 'react'
import cx from 'classnames'
import { User } from '../../../context/User'
import styles from './Indicator.module.scss'

const Indicator = ({
    className,
    togglePopover,
    forwardedRef
}: {
    className?: string
    togglePopover: () => void
    forwardedRef: (ref: HTMLElement | null) => void
}) => (
    <div
        className={cx(styles.status, className)}
        onMouseOver={togglePopover}
        onMouseOut={togglePopover}
        ref={forwardedRef}
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
