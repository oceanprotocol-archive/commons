import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Dotdotdot from 'react-dotdotdot'
import styles from './Asset.module.scss'
import CategoryImage from '../atoms/CategoryImage'

const AssetLink = ({ asset, list }: { asset: any; list?: boolean }) => {
    const { metadata } = asset.findServiceByType('Metadata')
    const { base } = metadata

    return list ? (
        <article className={styles.assetList}>
            <Link to={`/asset/${asset.id}`}>
                <h1>{base.name}</h1>
                <div
                    className={styles.date}
                    title={`Published on ${base.datePublished}`}
                >
                    {moment(base.datePublished, 'YYYYMMDD').fromNow()}
                </div>
            </Link>
        </article>
    ) : (
        <article className={styles.asset}>
            <Link to={`/asset/${asset.id}`}>
                {base.categories && (
                    <CategoryImage category={base.categories[0]} />
                )}
                <h1>{base.name}</h1>

                <div className={styles.description}>
                    <Dotdotdot clamp={3}>{base.description}</Dotdotdot>
                </div>

                <footer className={styles.assetFooter}>
                    {base.categories && <div>{base.categories[0]}</div>}
                </footer>
            </Link>
        </article>
    )
}

export default AssetLink
