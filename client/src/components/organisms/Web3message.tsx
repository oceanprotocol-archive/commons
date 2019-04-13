import React, { PureComponent } from 'react'
import Dotdotdot from 'react-dotdotdot'
import Button from '../atoms/Button'
import AccountStatus from '../molecules/AccountStatus'
import styles from './Web3message.module.scss'
import { User } from '../../context/User'

export default class Web3message extends PureComponent {
    private noWeb3 = () => (
        <div className={styles.message}>
            <AccountStatus className={styles.status} /> Not a Web3 Browser. For
            publishing and downloading an asset you need to{' '}
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

    private unlockAccount = () => (
        <div className={styles.message}>
            <AccountStatus className={styles.status} /> No accounts detected.
            For publishing and downloading an asset you need to unlock your Web3
            account.
        </div>
    )

    private haveAccount = (account: string) => (
        <div className={styles.message}>
            <AccountStatus className={styles.status} />
            <Dotdotdot clamp={1}>
                Connected with account
                <code className={styles.account}>{account}</code>
            </Dotdotdot>
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
        const { isWeb3, isNile, isLogged, network, account } = this.context

        return !isWeb3
            ? this.noWeb3()
            : !isNile
            ? this.wrongNetwork(network)
            : !isLogged
            ? this.unlockAccount()
            : isLogged
            ? this.haveAccount(account)
            : null
    }
}

Web3message.contextType = User
