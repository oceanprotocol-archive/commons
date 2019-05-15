import React from 'react'
import { Market } from '../../context'
import Content from '../atoms/Content'
import styles from './Footer.module.scss'

import meta from '../../data/meta.json'

const Footer = () => (
    <footer className={styles.footer}>
        <Market.Consumer>
            {state =>
                state.totalAssets > 0 && (
                    <Content wide>{state.totalAssets} total assets</Content>
                )
            }
        </Market.Consumer>

        <Content wide>
            <small>
                &copy; {new Date().getFullYear()}{' '}
                <a href={meta.social[0].url}>{meta.company}</a> &mdash; All
                Rights Reserved
            </small>

            <nav className={styles.links}>
                {meta.social.map(site => (
                    <a key={site.title} href={site.url}>
                        {site.title}
                    </a>
                ))}
            </nav>
        </Content>
    </footer>
)

export default Footer
