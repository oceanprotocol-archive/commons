import React, { PureComponent, MouseEvent } from 'react'
import Dotdotdot from 'react-dotdotdot'
import { toDataUrl } from 'ethereum-blockies'
import styles from './Account.module.scss'
import WalletSelector from '../organisms/WalletSelector'
import content from '../../data/web3message.json'
import { ReactComponent as Caret } from '../../img/caret.svg'
import { User } from '../../context'
import Button from './Button'

export default class Account extends PureComponent<
    {},
    { isAccountInfoOpen: boolean }
> {
    public static contextType = User

    public state = {
        isAccountInfoOpen: false
    }

    private toggleAccountInfo(event: MouseEvent) {
        event.preventDefault()
        this.setState({ isAccountInfoOpen: !this.state.isAccountInfoOpen })
    }

    public render() {
        const { account, isBurner, loginMetamask, isWeb3Capable } = this.context
        const { isAccountInfoOpen } = this.state
        const seedphrase = localStorage.getItem('seedphrase') as string
        const blockies = account && toDataUrl(account)

        return (
            <div className={styles.account}>
                {account ? (
                    <>
                        <img
                            className={styles.blockies}
                            src={blockies}
                            alt="Blockies"
                        />
                        <Dotdotdot className={styles.accountId} clamp={2}>
                            {account}
                        </Dotdotdot>
                    </>
                ) : (
                    <>
                        <span className={styles.blockies} />
                        <em className={styles.noAccount}>
                            No account selected
                        </em>
                        <Button
                            link
                            className={styles.unlock}
                            onClick={() => loginMetamask()}
                        >
                            Unlock Account
                        </Button>
                    </>
                )}

                <div className={styles.accountType}>
                    {isBurner ? (
                        <button
                            className={styles.toggle}
                            onClick={event => this.toggleAccountInfo(event)}
                            title="Show More Account Info"
                        >
                            <Caret
                                className={isAccountInfoOpen ? styles.open : ''}
                            />{' '}
                            Burner Wallet
                        </button>
                    ) : (
                        'MetaMask'
                    )}
                    {isWeb3Capable && <WalletSelector />}
                </div>

                {isBurner && isAccountInfoOpen && (
                    <div className={styles.seedphrase}>
                        <code>{seedphrase}</code>
                        <p className={styles.seedphraseHelp}>
                            {content.seedphrase}
                        </p>
                    </div>
                )}
            </div>
        )
    }
}
