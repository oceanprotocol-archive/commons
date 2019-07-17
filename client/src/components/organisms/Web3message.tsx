import React, { PureComponent } from 'react'
import Account from '../atoms/Account'
import AccountStatus from '../molecules/AccountStatus'
import styles from './Web3message.module.scss'
import { User, Market } from '../../context'
import content from '../../data/web3message.json'

export default class Web3message extends PureComponent<{ extended?: boolean }> {
    public static contextType = Market

    private messageOceanNetwork = () =>
        this.context.network === 'Pacific'
            ? content.wrongNetworkPacific
            : this.context.network === 'Nile'
            ? content.wrongNetworkNile
            : this.context.network === 'Duero'
            ? content.wrongNetworkDuero
            : content.wrongNetworkSpree

    private Message = () => {
        const { networkMatch, network } = this.context

        return (
            <User.Consumer>
                {user => (
                    <em
                        dangerouslySetInnerHTML={{
                            __html:
                                !networkMatch && !user.isBurner
                                    ? this.messageOceanNetwork()
                                    : !user.isLogged
                                    ? content.noAccount
                                    : user.isBurner
                                    ? content.hasBurnerWallet
                                    : user.isLogged
                                    ? content.hasMetaMaskWallet.replace(
                                          'NETWORK',
                                          network
                                      )
                                    : ''
                        }}
                    />
                )}
            </User.Consumer>
        )
    }

    public render() {
        const { networkMatch } = this.context

        return (
            <div className={styles.message}>
                <div className={styles.account}>
                    <Account />
                </div>

                {(!networkMatch || this.props.extended) && (
                    <div className={styles.text}>
                        <AccountStatus className={styles.status} />
                        <this.Message />
                    </div>
                )}
            </div>
        )
    }
}
