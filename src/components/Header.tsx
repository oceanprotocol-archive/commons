import React from 'react'
import { Link } from 'react-router-dom'
import Content from '../components/Content'
import styles from './Header.module.scss'

import menu from '../data/menu.json'

const Header = () => (
    <header className={styles.header}>
        <Content wide>
            <nav>
                {menu.map(item => (
                    <Link key={item.title} to={item.link}>
                        {item.title}
                    </Link>
                ))}
            </nav>
        </Content>
    </header>
)

export default Header
