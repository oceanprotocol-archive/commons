import React from 'react'
import styles from './Status.module.scss'

export default function Status({
    message,
    error
}: {
    message: string
    error?: string
}) {
    const classes = error ? styles.error : styles.message
    return <div className={classes}>{message}</div>
}
