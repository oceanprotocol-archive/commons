import React from 'react'
import cx from 'classnames'
import { User, Market } from '../../../context'
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
            {user => (
                <Market.Consumer>
                    {market =>
                        !user.isLogged || !market.networkMatch ? (
                            <span
                                className={styles.statusIndicatorCloseEnough}
                            />
                        ) : user.isLogged ? (
                            <span className={styles.statusIndicatorActive} />
                        ) : null
                    }
                </Market.Consumer>
            )}
        </User.Consumer>
    </div>
)

export default Indicator
