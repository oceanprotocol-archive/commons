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
    minimal,
    readOnly
}: {
    asset: any
    list?: boolean
    minimal?: boolean
    readOnly?: boolean
}) => {
    const { attributes } = asset.findServiceByType ? asset.findServiceByType('metadata') : asset
    const { main, additionalInformation } = attributes
    let tags = additionalInformation.tags || []
    let hashtags = [ main.type ]
    hashtags.push(...tags)
    hashtags = hashtags.map((tag) => `#${tag}`)
    const totalFiles = main.files.length

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
            <Link to={!readOnly ? `/asset/${asset.id}`:'#'}>
                {additionalInformation.categories && !minimal && (
                    <CategoryImage
                        dimmed={!readOnly}
                        category={additionalInformation.categories[0]}
                    />
                )}
                <h1>{main.name}</h1>
                {additionalInformation.categories && (
                    <div>{additionalInformation.categories[0]}</div>
                )}
                <div className={styles.hashtags}>
                    <span>{hashtags.reduceRight((i: string, t: string) => `${i}, ${t}`)}</span>
                </div>

                {!minimal && (
                    <div className={styles.description}>
                        <Dotdotdot clamp={3}>
                            {additionalInformation.description}
                        </Dotdotdot>
                    </div>
                )}
                <footer className={styles.assetFooter}>
                    <div>{totalFiles} File{totalFiles > 1 ? 's':''}</div>
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
