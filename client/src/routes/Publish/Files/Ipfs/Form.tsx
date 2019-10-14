import React from 'react'
import Label from '../../../../components/atoms/Form/Label'
import Status from './Status'
import styles from './Form.module.scss'

export default function Form({
    children,
    ipfsMessage,
    ipfsError,
    isIpfsReady,
    error
}: {
    children: any
    ipfsMessage: string
    ipfsError?: string
    isIpfsReady: boolean
    error?: string
}) {
    return (
        <div className={styles.ipfsForm}>
            <Label htmlFor="fileUpload" required>
                Add File To IPFS
            </Label>
            {children}
            <Status
                message={ipfsMessage}
                isIpfsReady={isIpfsReady}
                error={ipfsError || error}
            />
        </div>
    )
}
