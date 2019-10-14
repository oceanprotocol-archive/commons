import React, { useContext } from 'react'
import { User } from '../../context'
import styles from './ActionResponse.module.scss'

export const ActionSuccess = ({
    success,
    trxHash
}: {
    success: string
    trxHash: string
}) => {
    const { network } = useContext(User)
    const submarineLink = `https://submarine.${
        network === 'pacific' ? 'oceanprotocol' : `${network}.dev-ocean`
    }.com/tx/${trxHash}`

    return (
        <div className={styles.success}>
            <strong>{success}</strong>
            {trxHash && (
                <p>
                    <strong>Your Transaction Hash</strong>

                    <a href={submarineLink}>
                        <code>{trxHash}</code>
                    </a>
                </p>
            )}
        </div>
    )
}

export const ActionError = ({ error }: { error: string }) => (
    <div className={styles.error}>
        <p>{error}</p>
    </div>
)
