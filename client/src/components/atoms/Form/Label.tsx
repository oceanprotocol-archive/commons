import React from 'react'
import cx from 'classnames'
import styles from './Label.module.scss'

const Label = ({
    required,
    children,
    small,
    ...props
}: {
    required?: boolean
    children: string
    htmlFor: string
    small?: boolean
}) => (
    <label
        className={cx(
            styles.label,
            required && styles.required,
            small && styles.small
        )}
        title={required ? 'Required' : ''}
        {...props}
    >
        {children}
    </label>
)

export default Label
