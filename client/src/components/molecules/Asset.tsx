import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Asset.module.scss'

const AssetLink = ({ asset, list }: { asset: any; list?: boolean }) => {
    const { metadata } = asset.findServiceByType('Metadata')
    const { base } = metadata

    return list ? (
        <article className={styles.assetList}>
            <Link to={`/asset/${asset.id}`}>
                <h1>{base.name}</h1>
            </Link>
        </article>
    ) : (
        <article className={styles.asset}>
            <Link to={`/asset/${asset.id}`}>
                <h1>{base.name}</h1>
                <p>{base.description.substring(0, 90)}</p>

                <footer className={styles.assetFooter}>
                    {base.categories ? (
                        <div>{base.category}</div>
                    ) : (
                        <div>Fake Category</div>
                    )}
                </footer>
            </Link>
        </article>
    )
}

export default AssetLink
