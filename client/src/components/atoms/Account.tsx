import React from 'react'
import Dotdotdot from 'react-dotdotdot'
import { toDataUrl } from 'ethereum-blockies'
import styles from './Account.module.scss'

const Account = ({
    account,
    isBurner
}: {
    account: string
    isBurner: boolean
}) => {
    const blockies = account && toDataUrl(account)

    return account && blockies ? (
        <div className={styles.account}>
            <img className={styles.blockies} src={blockies} alt="Blockies" />
            <Dotdotdot clamp={2}>{account}</Dotdotdot>
            {isBurner && (
                <span className={styles.accountType}>Burner Wallet</span>
            )}
        </div>
    ) : (
        <em>No account selected</em>
    )
}

export default Account
