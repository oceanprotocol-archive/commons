import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'
import { ReactComponent as Logo } from '@oceanprotocol/art/logo/logo.svg'
import { User } from '../../context'
import AccountStatus from '../molecules/AccountStatus'
import styles from './Header.module.scss'

import meta from '../../data/meta.json'

export default class Header extends PureComponent {
    public render() {
        return (
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <NavLink to={'/'} className={styles.headerLogo}>
                        <Logo className={styles.headerLogoImage} />
                        <h1 className={styles.headerTitle}>{meta.title}</h1>
                    </NavLink>

                    <nav className={styles.headerMenu}>
                        <AccountStatus className={styles.accountStatus} />
                    </nav>
                </div>
            </header>
        )
    }
}

Header.contextType = User
