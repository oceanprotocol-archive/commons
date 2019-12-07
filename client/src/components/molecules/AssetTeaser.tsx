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
    const { attributes } = asset.findServiceByType('metadata')
    const { main, additionalInformation } = attributes

    return list ? (
        <article className={styles.assetList}>
            <Link to={`/asset/${asset.id}`}>
                <h1>{main.name}</h1>
                <div
                    className={styles.date}
                    title={`Published on ${main.datePublished}`}
                >
                    {moment(main.datePublished, 'YYYYMMDD').fromNow()}
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
                {additionalInformation.categories && !minimal && (
                    <CategoryImage
                        dimmed
                        category={additionalInformation.categories[0]}
                    />
                )}
                <h1>{main.name}</h1>

                {!minimal && (
                    <div className={styles.description}>
                        <Dotdotdot clamp={3}>
                            {additionalInformation.description}
                        </Dotdotdot>
                    </div>
                )}
                <footer className={styles.assetFooter}>
                    {additionalInformation.categories && (
                        <div>{additionalInformation.categories[0]}</div>
                    )}
                    {allowPricing && (
                        <div className={styles.price}>
                            <span>
                                {Web3.utils.fromWei(main.price.toString())}
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
