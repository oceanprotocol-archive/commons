import React, { PureComponent } from 'react'
import Button from '../components/atoms/Button'
import styles from './Web3message.module.scss'
import { User } from '../context/User'

export default class Web3message extends PureComponent {
    public render() {
        return (
            <>
                <User.Consumer>
                    {states =>
                        !states.isWeb3
                            ? this.noWeb3()
                            : !states.isLogged
                            ? this.unlockAccount(states)
                            : states.isLogged
                            ? this.haveAccount()
                            : null
                    }
                </User.Consumer>
            </>
        )
    }

    public noWeb3() {
        return (
            <div className={styles.message}>
                <span className={styles.indicator} /> No Web3 Browser. For
                publishing an asset you need to use a Web3-capable plugin or
                browser, like{' '}
                <a href="https://docs.oceanprotocol.com/tutorials/wallets/#how-to-setup-metamask">
                    MetaMask
                </a>
                .
            </div>
        )
    }

    public unlockAccount(states: any) {
        return (
            <div className={styles.message}>
                <span className={styles.indicatorCloseEnough} /> Account locked.
                For publishing an asset you need to unlock your Web3 account.
                <Button link onClick={states.startLogin}>
                    Unlock account
                </Button>
            </div>
        )
    }

    public haveAccount() {
        return (
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
        )
    }
}
