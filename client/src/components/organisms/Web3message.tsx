import React, { PureComponent } from 'react'
import Account from '../atoms/Account'
import AccountStatus from '../molecules/AccountStatus'
import styles from './Web3message.module.scss'
import { User } from '../../context'
import WalletSelector from './WalletSelector'
import content from '../../data/web3message.json'

export default class Web3message extends PureComponent {
    private message = (
        message: string,
        account?: string,
    ) => (
        <div className={styles.message}>
            {account ? (
                <Account account={account} />
            ) : (
                <div className={styles.warnings}>
                    <AccountStatus className={styles.status} />
                    <span dangerouslySetInnerHTML={{ __html: message }} />{' '}
                    <WalletSelector/>
                </div>
            )}
        </div>
    )

    public render() {
        const {
            isOceanNetwork,
            isLogged,
            isBurner,
            account,
        } = this.context

        return !isOceanNetwork
            ? this.message(content.wrongNetwork)
            : !isLogged
            ? this.message(content.noAccount)
            : isBurner
            ? this.message(content.burnerWallet)
            : isLogged
            ? this.message(content.hasAccount, account)
            : null
    }
}

Web3message.contextType = User
