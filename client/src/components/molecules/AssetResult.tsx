import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Dotdotdot from 'react-dotdotdot'
import cx from 'classnames'
import styles from './AssetResult.module.scss'
import CategoryImage from '../atoms/CategoryImage'
import { allowPricing } from '../../config'
import Web3 from 'web3'
import database from '../../img/database.svg'

const AssetResult = ({
    asset
}: {
    asset: any
}) => {
    const { attributes } = asset.findServiceByType ? asset.findServiceByType('metadata') : asset
    const { main, additionalInformation } = attributes
    let tags = (additionalInformation && additionalInformation.tags) || []

    const totalFiles = main.files.length

    return (
        <article className={styles.assetList}>
            <Link to={`/asset/${asset.id}`}>
                <div className={styles.message}>
                    <div className={styles.messageAvatar}>
                            <img src={database} alt="" />
                    </div>
                    <div className={styles.messageBody}>
                        <p>{main.name}</p>
                        <small>{`Published on ${main.datePublished}`}</small>
                    </div>
                </div>
            </Link>
        </article>
    )

}

export default AssetResult
