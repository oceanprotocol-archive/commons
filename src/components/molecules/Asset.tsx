import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Asset.module.scss'

const AssetLink = ({ asset }: { asset: any }) => {
    const { metadata } = asset.findServiceByType('Metadata')

    return (
        <article className={styles.asset}>
            <Link to={`/asset/${asset.id}`}>
                <h1>{metadata.base.name}</h1>
                <p>{metadata.base.description.substring(0, 140)}</p>

                <footer className={styles.assetFooter}>
                    <div>{metadata.base.category}</div>
                </footer>
            </Link>
        </article>
    )
}

export default AssetLink
