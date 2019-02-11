import React, { PureComponent } from 'react'
import Button from '../components/atoms/Button'
import styles from './Web3message.module.scss'

export default class Web3message extends PureComponent {
    public render() {
        // let indicatorClasses = styles.indicatorCloseEnough

        // if (this.props.activeAccount) {
        //     indicatorClasses = styles.indicatorActive
        // }

        return (
            <>
                {/* IF no Web3 */}
                <div className={styles.message}>
                    <span className={styles.indicator} /> No Web3 Browser. For
                    publishing an asset you need to use a Web3-capable plugin or
                    browser, like{' '}
                    <a href="https://docs.oceanprotocol.com/tutorials/wallets/#how-to-setup-metamask">
                        MetaMask
                    </a>
                    .
                </div>

                {/* IF connected and account locked */}
                <div className={styles.message}>
                    <span className={styles.indicatorCloseEnough} /> Account
                    locked. For publishing an asset you need to unlock your Web3
                    account.
                    <Button link>Unlock account</Button>
                </div>

                {/* IF connected and unlocked */}
                <div className={styles.message}>
                    <span className={styles.indicatorActive} /> Connected with
                    account
                    <span
                        className={styles.account}
                        title="0xfehz2u89nfewhji432ntio43huof42huifewhnuefwo"
                    >
                        0xfehz2u89n...
                    </span>
                </div>
            </>
        )
    }
}
