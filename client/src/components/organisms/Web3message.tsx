import React, { PureComponent } from 'react'
import Account from '../atoms/Account'
import AccountStatus from '../molecules/AccountStatus'
import styles from './Web3message.module.scss'
import { User } from '../../context'
import WalletSelector from './WalletSelector'
import content from '../../data/web3message.json'

export default class Web3message extends PureComponent {
    public static contextType = User

    private message = () => {
        const { isOceanNetwork, isLogged, isBurner } = this.context

        return !isOceanNetwork && !isBurner
            ? content.wrongNetwork
            : !isLogged
            ? content.noAccount
            : isBurner
            ? content.hasBurnerWallet
            : isLogged
            ? content.hasMetaMaskWallet
            : ''
    }

    public render() {
        return (
            <div className={styles.message}>
                {this.context.account ? (
                    <Account
                        account={this.context.account}
                        isBurner={this.context.isBurner}
                    />
                ) : (
                    <AccountStatus className={styles.status} />
                )}
                <em
                    className={styles.text}
                    dangerouslySetInnerHTML={{ __html: this.message() }}
                />{' '}
                <WalletSelector />
            </div>
        )
    }
}
