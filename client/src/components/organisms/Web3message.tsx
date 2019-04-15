import React, { PureComponent } from 'react'
import Dotdotdot from 'react-dotdotdot'
import Button from '../atoms/Button'
import AccountStatus from '../molecules/AccountStatus'
import styles from './Web3message.module.scss'
import { User } from '../../context'
import content from '../../data/web3message.json'

export default class Web3message extends PureComponent {
    private message = (
        message: string,
        account?: string,
        unlockAccounts?: () => any
    ) => (
        <div className={styles.message}>
            <AccountStatus className={styles.status} />{' '}
            {account ? (
                <Dotdotdot clamp={1}>
                    {message}
                    <code className={styles.account}>{account}</code>
                </Dotdotdot>
            ) : (
                <>
                    <span dangerouslySetInnerHTML={{ __html: message }} />{' '}
                    {unlockAccounts && (
                        <Button onClick={() => unlockAccounts()} link>
                            Unlock Account
                        </Button>
                    )}
                </>
            )}
        </div>
    )

    public render() {
        const {
            isWeb3,
            isNile,
            isLogged,
            account,
            unlockAccounts
        } = this.context

        return !isWeb3
            ? this.message(content.noweb3)
            : !isNile
            ? this.message(content.wrongNetwork)
            : !isLogged
            ? this.message(content.noAccount, '', unlockAccounts)
            : isLogged
            ? this.message(content.hasAccount, account)
            : null
    }
}

Web3message.contextType = User
