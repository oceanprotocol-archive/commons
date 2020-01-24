import React, { useContext, useEffect, useState } from 'react'
import { DDO, Logger } from '@oceanprotocol/squid'
import { User } from '../../context'
import Spinner from '../atoms/Spinner'
import AssetTeaser from '../molecules/AssetTeaser'
import styles from './AssetsLatest.module.scss'

const AssetsLatest = () => {
    const [latestAssets, setLatestAssets] = useState<DDO[]>([])
    const [isLoadingLatest, setIsLoadingLatest] = useState(false)
    const { ocean } = useContext(User)

    const getLatestAssets = async () => {
        const searchQuery = {
            offset: 15,
            page: 1,
            query: {},
            sort: {
                created: -1
            }
        }

        try {
            const search = await ocean.assets.query(searchQuery)
            setLatestAssets(search.results)
            setIsLoadingLatest(false)
        } catch (error) {
            Logger.error(error.message)
            setIsLoadingLatest(false)
        }
    }

    useEffect(() => {
        getLatestAssets()
    }, [])

    return (
        <>
            <h2 className={styles.title}>Latest published assets</h2>
            <div className={styles.latestAssetsWrap}>
                {isLoadingLatest ? (
                    <Spinner message="Loading..." />
                ) : latestAssets && latestAssets.length ? (
                    <div className={styles.latestAssets}>
                        {latestAssets.map(asset => (
                            <AssetTeaser key={asset.id} asset={asset} minimal />
                        ))}
                    </div>
                ) : (
                    <div>No data sets found.</div>
                )}
            </div>
        </>
    )
}

export default AssetsLatest
