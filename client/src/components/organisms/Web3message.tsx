import React, { PureComponent } from 'react'
import Button from '../atoms/Button'
import AccountStatus from '../molecules/AccountStatus'
import styles from './Web3message.module.scss'
import { User } from '../../context/User'

export default class Web3message extends PureComponent {
    private noWeb3 = () => (
        <div className={styles.message}>
            <AccountStatus className={styles.status} /> Not a Web3 Browser. For
            publishing or downloading an asset you need to{' '}
            <a
                href="https://docs.oceanprotocol.com/tutorials/metamask-setup/"
                target="_blank"
                rel="noopener noreferrer"
            >
                setup MetaMask
            </a>{' '}
            or use any other Web3-capable plugin or browser.
        </div>
    )

    private unlockAccount = (states: any) => (
        <div className={styles.message}>
            <AccountStatus className={styles.status} /> Account locked. For
            publishing and downloading an asset you need to unlock your Web3
            account.{' '}
            <Button link onClick={states.startLogin}>
                Unlock account
            </Button>
        </div>
    )

    private haveAccount = (account: string) => (
        <div className={styles.message}>
            <AccountStatus className={styles.status} /> Connected with account
            <code className={styles.account} title={account && account}>
                {`${account && account.substring(0, 20)}...`}
            </code>
        </div>
    )

    private wrongNetwork = (network: string) => (
        <div className={styles.message}>
            <AccountStatus className={styles.status} /> Not connected to Nile
            network, but to {network}.<br />
            Please connect in MetaMask with Custom RPC{' '}
            <code>{`https://nile.dev-ocean.com`}</code>
        </div>
    )

    public render() {
        return (
            <User.Consumer>
                {states =>
                    !states.isWeb3
                        ? this.noWeb3()
                        : !states.isNile
                        ? this.wrongNetwork(states.network)
                        : !states.isLogged
                        ? this.unlockAccount(states)
                        : states.isLogged
                        ? this.haveAccount(states.account)
                        : null
                }
            </User.Consumer>
        )
    }
}
