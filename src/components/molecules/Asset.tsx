import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Asset.module.scss'

const AssetLink = ({ asset }: { asset: any }) => {
    const { metadata } = asset.findServiceByType('Metadata')
    const { base } = metadata

    return (
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
