import React, { PureComponent } from 'react'
import Dotdotdot from 'react-dotdotdot'
import { toDataUrl } from 'ethereum-blockies'
import styles from './Account.module.scss'
import WalletSelector from '../organisms/WalletSelector'
import content from '../../data/web3message.json'
import { ReactComponent as Caret } from '../../img/caret.svg'

export default class Account extends PureComponent<
    {
        account: string
        isBurner: boolean
        extended?: boolean
    },
    { isAccountOpen: boolean }
> {
    public state = {
        isAccountOpen: false
    }

    private toggleAccountInfo() {
        this.setState({ isAccountOpen: !this.state.isAccountOpen })
    }

    public render() {
        const { account, isBurner, extended } = this.props
        const seedphrase = localStorage.getItem('seedphrase') as string

        const blockies = account && toDataUrl(account)
        return account && blockies ? (
            <div className={styles.account}>
                <img
                    className={styles.blockies}
                    src={blockies}
                    alt="Blockies"
                />
                <Dotdotdot clamp={2}>{account}</Dotdotdot>
                <div className={styles.accountType}>
                    {isBurner ? (
                        <button
                            className={styles.toggle}
                            onClick={() => this.toggleAccountInfo()}
                            title="Show More Account Info"
                        >
                            <Caret
                                className={
                                    this.state.isAccountOpen ? styles.open : ''
                                }
                            />{' '}
                            Burner Wallet
                        </button>
                    ) : (
                        'MetaMask'
                    )}
                    <WalletSelector />
                </div>

                {isBurner && this.state.isAccountOpen && (
                    <div className={styles.seedphrase}>
                        <code>{seedphrase}</code>
                        <p className={styles.seedphraseHelp}>
                            {content.seedphrase}
                        </p>
                    </div>
                )}
            </div>
        ) : (
            <em>No account selected</em>
        )
    }
}
