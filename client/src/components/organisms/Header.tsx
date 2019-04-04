import React from 'react'
import { NavLink } from 'react-router-dom'
import { ReactComponent as Logo } from '@oceanprotocol/art/logo/logo.svg'
import { User } from '../../context/User'
import AccountStatus from '../molecules/AccountStatus'
import styles from './Header.module.scss'

import menu from '../../data/menu.json'
import meta from '../../data/meta.json'

const MenuItem = ({ item, isWeb3 }: { item: any; isWeb3: boolean }) => {
    if (item.web3 && !isWeb3) return null

    return (
        <NavLink
            to={item.link}
            className={styles.link}
            activeClassName={styles.linkActive}
            exact
        >
            {item.title}
        </NavLink>
    )
}

const Header = () => (
    <header className={styles.header}>
        <div className={styles.headerContent}>
            <NavLink to={'/'} className={styles.headerLogo}>
                <Logo className={styles.headerLogoImage} />
                <h1 className={styles.headerTitle}>{meta.title}</h1>
            </NavLink>

            <nav className={styles.headerMenu}>
                <User.Consumer>
                    {states =>
                        menu.map(item => (
                            <MenuItem
                                key={item.title}
                                item={item}
                                isWeb3={states.isWeb3}
                            />
                        ))
                    }
                </User.Consumer>
            </nav>
            <AccountStatus className={styles.accountStatus} />
        </div>
    </header>
)

export default Header
