import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Dotdotdot from 'react-dotdotdot'
import cx from 'classnames'
import styles from './AssetTeaser.module.scss'
import CategoryImage from '../atoms/CategoryImage'
import { allowPricing } from '../../config'
import Web3 from 'web3'

const AssetTeaser = ({
    asset,
    list,
    minimal
}: {
    asset: any
    list?: boolean
    minimal?: boolean
}) => {
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
        <article
            className={
                minimal ? cx(styles.asset, styles.minimal) : styles.asset
            }
        >
            <Link to={`/asset/${asset.id}`}>
                {base.categories && !minimal && (
                    <CategoryImage dimmed category={base.categories[0]} />
                )}
                <h1>{base.name}</h1>

                {!minimal && (
                    <div className={styles.description}>
                        <Dotdotdot clamp={3}>{base.description}</Dotdotdot>
                    </div>
                )}
                <footer className={styles.assetFooter}>
                    {base.categories && <div>{base.categories[0]}</div>}
                    {allowPricing && (
                        <div className={styles.price}>
                            <span>
                                {Web3.utils.fromWei(base.price.toString())}
                            </span>{' '}
                            OCEAN
                        </div>
                    )}
                </footer>
            </Link>
        </article>
    )
}

export default AssetTeaser
