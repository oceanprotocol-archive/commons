import React from 'react'
import { NavLink } from 'react-router-dom'
import { ReactComponent as Logo } from '@oceanprotocol/art/logo/logo.svg'
import styles from './Header.module.scss'

import menu from '../data/menu.json'
import meta from '../data/meta.json'

const Header = () => (
    <header className={styles.header}>
        <div className={styles.headerContent}>
            <NavLink to={'/'} className={styles.headerLogo}>
                <Logo className={styles.headerLogoImage} />
                <h1 className={styles.headerTitle}>{meta.title}</h1>
            </NavLink>

            <nav className={styles.headerMenu}>
                {menu.map(item => (
                    <NavLink
                        key={item.title}
                        to={item.link}
                        className={styles.link}
                        activeClassName={styles.linkActive}
                        exact
                    >
                        {item.title}
                    </NavLink>
                ))}
            </nav>
        </div>
    </header>
)

export default Header
