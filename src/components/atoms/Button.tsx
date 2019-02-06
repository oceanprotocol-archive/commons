import React, { PureComponent } from 'react'
import styles from './Button.module.scss'

interface ButtonProps {
    children: string
    primary?: boolean
    link?: boolean
    href?: string
    onClick?: any
}

export default class Button extends PureComponent<ButtonProps, any> {
    public render() {
        let classes
        const { primary, link, href, children, ...props } = this.props

        if (primary) {
            classes = styles.buttonPrimary
        } else if (link) {
            classes = styles.link
        } else {
            classes = styles.button
        }

        return href ? (
            <a href={href} className={classes} {...props}>
                {children}
            </a>
        ) : (
            <button className={classes} {...props}>
                {children}
            </button>
        )
    }
}
