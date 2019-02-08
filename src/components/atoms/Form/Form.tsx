import React from 'react'
import styles from './Form.module.scss'

const Form = ({
    title,
    description,
    children,
    onSubmit,
    ...props
}: {
    title?: string
    description?: string
    children: any
    onSubmit?: any
}) => (
    <form className={styles.form} onSubmit={onSubmit} {...props}>
        <header className={styles.formHeader}>
            <h1 className={styles.formTitle}>{title}</h1>
            <p className={styles.formDescription}>{description}</p>
        </header>

        {children}
    </form>
)

export default Form
