import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import styles from './Asset.module.scss'
import CategoryImage from '../atoms/CategoryImage'

const AssetLink = ({ asset, list }: { asset: any; list?: boolean }) => {
    const { metadata } = asset.findServiceByType('Metadata')
    const { base } = metadata

    return list ? (
        <article className={styles.assetList}>
            <Link to={`/asset/${asset.id}`}>
                <h1>{base.name}</h1>
                <div className={styles.date} title={base.dateCreated}>
                    {moment(base.dateCreated, 'YYYYMMDD').fromNow()}
                </div>
            </Link>
        </article>
    ) : (
        <article className={styles.asset}>
            <Link to={`/asset/${asset.id}`}>
                <CategoryImage category={base.categories[0][0]} />
                <h1>{base.name}</h1>
                <p>{base.description.substring(0, 90)}...</p>

                <footer className={styles.assetFooter}>
                    {base.categories && <div>{base.categories[0][0]}</div>}
                </footer>
            </Link>
        </article>
    )
}

export default AssetLink
