import React from 'react'
import cx from 'classnames'
import { User, Market } from '../../../context'
import Button from '../../atoms/Button'
import styles from './Indicator.module.scss'

const walletButonStyle = {
    borderRadius: '15px'
}
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
                                onClick={async () => {
                                    // await user.openWallet()
                                    togglePopover()
                                }} 
                                style={walletButonStyle}
                            >Connect Wallet ⚠️</Button>
                        ) : user.isLogged ? (
                            <Button 
                                onClick={togglePopover} 
                                style={walletButonStyle}
                            >Open Wallet</Button>
                        ) : null
                    }
                </Market.Consumer>
            )}
        </User.Consumer>
        </div>
)

export default Indicator
