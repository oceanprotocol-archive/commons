import React, { PureComponent } from 'react'
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
}

export default class Button extends PureComponent<ButtonProps, any> {
    public render() {
        let classes
        const {
            primary,
            link,
            href,
            children,
            className,
            to,
            ...props
        } = this.props

        if (primary) {
            classes = styles.buttonPrimary
        } else if (link) {
            classes = styles.link
        } else {
            classes = styles.button
        }

        if (to) {
            return (
                <Link to={to} className={cx(classes, className)} {...props}>
                    {children}
                </Link>
            )
        }

        if (href) {
            return (
                <a href={href} className={cx(classes, className)} {...props}>
                    {children}
                </a>
            )
        }

        return (
            <button className={cx(classes, className)} {...props}>
                {children}
            </button>
        )
    }
}
