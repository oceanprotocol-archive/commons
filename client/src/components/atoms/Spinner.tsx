import React from 'react'
import styles from './Spinner.module.scss'

const Spinner = ({
    message,
    small,
    className
}: {
    message?: string
    small?: boolean
    className?: string
}) => {
    const classes = className || (small ? styles.small : styles.spinner)

    return (
        <div className={classes}>
            {message && (
                <div
                    className={styles.spinnerMessage}
                    dangerouslySetInnerHTML={{ __html: message }}
                />
            )}
        </div>
    )
}

export default Spinner
