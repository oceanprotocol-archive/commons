import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import styles from './Button.module.scss'

interface ButtonProps {
    children: string
    className?: string
    primary?: boolean
    link?: boolean
    href?: string
    onClick?: any
    disabled?: boolean
    to?: string
    name?: string
}

function getClasses(primary: boolean | undefined, link: boolean | undefined) {
    return primary ? styles.buttonPrimary : link ? styles.link : styles.button
}

const Button = ({
    primary,
    link,
    href,
    children,
    className,
    to,
    ...props
}: ButtonProps) => {
    const classes = getClasses(primary, link)

    return to ? (
        <Link to={to} className={cx(classes, className)} {...props}>
            {children}
        </Link>
    ) : href ? (
        <a href={href} className={cx(classes, className)} {...props}>
            {children}
        </a>
    ) : (
        <button className={cx(classes, className)} {...props}>
            {children}
        </button>
    )
}

export default Button
