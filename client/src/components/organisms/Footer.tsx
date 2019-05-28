import React from 'react'
import { Market } from '../../context'
import Content from '../atoms/Content'
import { ReactComponent as AiCommons } from '../../img/aicommons.svg'
import styles from './Footer.module.scss'

import meta from '../../data/meta.json'
import { version } from '../../../package.json'
import { version as versionSquid } from '@oceanprotocol/squid/package.json'

const VersionNumber = () => {
    const versionOutput =
        process.env.NODE_ENV === 'production'
            ? `v${version}`
            : `v${version}-dev`

    return (
        <p className={styles.version}>
            <a
                title="See commons release on GitHub"
                href={`https://github.com/oceanprotocol/commons/releases/tag/v${version}`}
            >
                {versionOutput}
            </a>{' '}
            &mdash;{' '}
            <a
                title="See squid-js release on GitHub"
                href={`https://github.com/oceanprotocol/squid-js/releases/tag/v${versionSquid}`}
            >
                squid-js v{versionSquid}
            </a>
        </p>
    )
}

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
                <VersionNumber />
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
