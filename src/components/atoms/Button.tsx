import React, { PureComponent } from 'react'
import styles from './Button.module.scss'

interface IButtonProps {
    children: string
    primary?: boolean
    link?: boolean
    href?: string
}

export default class Button extends PureComponent<IButtonProps, any> {
    public render() {
        let classes
        const { primary, link, href, children } = this.props

        if (primary) {
            classes = styles.buttonPrimary
        } else if (link) {
            classes = styles.link
        } else {
            classes = styles.button
        }

        return href ? (
            <a href={href} className={classes} {...this.props}>
                {children}
            </a>
        ) : (
            <button className={classes} {...this.props}>
                {children}
            </button>
        )
    }
}
