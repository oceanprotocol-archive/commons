import React from 'react'
import styles from './Label.module.scss'

const Label = ({
    required,
    children,
    ...props
}: {
    required?: boolean
    children: string
    htmlFor: string
}) => (
    <label
        className={required ? styles.required : styles.label}
        {...props}
        title={required ? 'Required' : ''}
    >
        {children}
    </label>
)

export default Label
