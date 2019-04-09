import React, { PureComponent } from 'react'
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

export default class Header extends PureComponent {
    public render() {
        const { isWeb3 } = this.context

        return (
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <NavLink to={'/'} className={styles.headerLogo}>
                        <Logo className={styles.headerLogoImage} />
                        <h1 className={styles.headerTitle}>{meta.title}</h1>
                    </NavLink>

                    <nav className={styles.headerMenu}>
                        {menu.map(item => (
                            <MenuItem
                                key={item.title}
                                item={item}
                                isWeb3={isWeb3}
                            />
                        ))}
                        <AccountStatus className={styles.accountStatus} />
                    </nav>
                </div>
            </header>
        )
    }
}

Header.contextType = User
