import React from 'react'
import cx from 'classnames'
import { User, Market } from '../../../context'
import Button from '../../atoms/Button'
import styles from './Indicator.module.scss'

// const Indicator = ({
//     className,
//     togglePopover,
//     forwardedRef
// }: {
//     className?: string
//     togglePopover: () => void
//     forwardedRef: (ref: HTMLElement | null) => void
// }) => (
//     <div
//         className={cx(styles.status, className)}
//         onClick={togglePopover}
//         ref={forwardedRef}
//     >
//         <User.Consumer>
//             {user => (
//                 <Market.Consumer>
//                     {market =>
//                         !user.isLogged || !market.networkMatch ? (
//                             <span
//                                 className={styles.statusIndicatorCloseEnough}
//                             />
//                         ) : user.isLogged ? (
//                             <span className={styles.statusIndicatorActive} />
//                         ) : null
//                     }
//                 </Market.Consumer>
//             )}
//         </User.Consumer>
//     </div>
// )
const Indicator = ({
    className,
    togglePopover,
    forwardedRef
}: {
    className?: string
    togglePopover: () => void
    forwardedRef: (ref: HTMLElement | null) => void
}) => (
        <div className={cx(styles.status, className)} ref={forwardedRef}>
        <User.Consumer>
            {user => (
                <Market.Consumer>
                    {market =>
                        !user.isLogged || !market.networkMatch ? (
                            <Button
                                onClick={() => {
                                    console.log(user)
                                    user.openWallet();
                                    // togglePopover()
                                }}
                                className={styles.walletButonStyle}
                            >Connect Wallet 🔴</Button>
                        ) : user.isLogged ? (
                            <Button
                                onClick={() => {
                                    // togglePopover()
                                    user.openWallet()
                                }}
                                className={styles.walletButonStyle}
                            >{user.account && ('🔵 ' + user.account.substring(0, 4) + '...' + user.account.substring(user.account.length-4, user.account.length))}</Button>
                        ) : null
                    }
                </Market.Consumer>
            )}
        </User.Consumer>
        </div>
)

export default Indicator
