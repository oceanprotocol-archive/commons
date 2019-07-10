import React, { PureComponent } from 'react'
import Account from '../atoms/Account'
import AccountStatus from '../molecules/AccountStatus'
import styles from './Web3message.module.scss'
import { User } from '../../context'
import content from '../../data/web3message.json'

export default class Web3message extends PureComponent<{ extended?: boolean }> {
    public static contextType = User

    private message = () => {
        const { isOceanNetwork, isLogged, isBurner } = this.context

        return !isOceanNetwork && !isBurner
            ? content.wrongNetworkPacific
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
                <div className={styles.account}>
                    <Account
                        account={this.context.account}
                        isBurner={this.context.isBurner}
                    />
                </div>

                {this.props.extended && (
                    <p className={styles.text}>
                        <AccountStatus className={styles.status} />
                        <em
                            dangerouslySetInnerHTML={{
                                __html: this.message()
                            }}
                        />
                    </p>
                )}
            </div>
        )
    }
}
