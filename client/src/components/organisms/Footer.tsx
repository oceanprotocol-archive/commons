import React, { useContext } from 'react'
import { Market, User } from '../../context'
import Content from '../atoms/Content'
import { ReactComponent as AiCommons } from '../../img/aicommons.svg'
import styles from './Footer.module.scss'

import meta from '../../data/meta.json'
import VersionNumbers from '../molecules/VersionNumbers'

export default function Footer() {
    const market = useContext(Market)
    const user = useContext(User)

    return (
        <footer className={styles.footer}>
            <aside className={styles.stats}>
                <Content wide>
                    <p>
                        Online since March 2019.
                        {market.totalAssets > 0 &&
                            ` With a total of ${market.totalAssets} registered assets.`}
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
                    <VersionNumbers account={user.account} minimal />
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
}
