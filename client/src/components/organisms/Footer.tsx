import React from 'react'
import { Market } from '../../context'
import Content from '../atoms/Content'
import { ReactComponent as AiCommons } from '../../img/aicommons.svg'
import styles from './Footer.module.scss'

import meta from '../../data/meta.json'
import VersionNumbers from '../atoms/VersionNumbers'

const Footer = () => (
    <footer className={styles.footer}>
        <aside className={styles.stats}>
            <Content wide>
                <p>
                    Online since March 2019.
                    <Market.Consumer>
                        {state =>
                            state.totalAssets > 0 &&
                            ` With a total of ${
                                state.totalAssets
                            } registered assets.`
                        }
                    </Market.Consumer>
                </p>
                <p className={styles.aicommons}>
                    Proud supporter of{' '}
                    <a
                        href="https://aicommons.com/?utm_source=commons.oceanprotocol.com"
                        title="AI Commons"
                    >
                        <AiCommons />
                    </a>
                </p>
                <VersionNumbers minimal />
            </Content>
        </aside>

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
