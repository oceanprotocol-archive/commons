import React from 'react'
import styles from './Status.module.scss'

export default function Status({
    message,
    error,
    isIpfsReady
}: {
    message: string
    error?: string
    isIpfsReady: boolean
}) {
    const classes = isIpfsReady
        ? styles.success
        : error
        ? styles.error
        : styles.message
    return <div className={classes}>{error || message}</div>
}
