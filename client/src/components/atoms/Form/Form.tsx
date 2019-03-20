import React from 'react'
import styles from './Form.module.scss'

const Form = ({
    title,
    description,
    children,
    onSubmit,
    minimal,
    ...props
}: {
    title?: string
    description?: string
    children: any
    onSubmit?: any
    minimal?: boolean
}) => (
    <form
        className={minimal ? styles.formMinimal : styles.form}
        onSubmit={onSubmit}
        {...props}
    >
        {title && (
            <header className={styles.formHeader}>
                <h1 className={styles.formTitle}>{title}</h1>
                {description && (
                    <p className={styles.formDescription}>{description}</p>
                )}
            </header>
        )}

        {children}
    </form>
)

export default Form
