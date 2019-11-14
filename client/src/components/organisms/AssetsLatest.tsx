import React, { PureComponent } from 'react'
import { Logger } from '@oceanprotocol/squid'
import { User } from '../../context'
import Spinner from '../atoms/Spinner'
import AssetTeaser from '../molecules/AssetTeaser'
import styles from './AssetsLatest.module.scss'

interface AssetsLatestState {
    latestAssets?: any[]
    isLoadingLatest?: boolean
}

export default class AssetsLatest extends PureComponent<{}, AssetsLatestState> {
    public state = { latestAssets: [], isLoadingLatest: true }

    public _isMounted = false

    public componentDidMount() {
        this._isMounted = true
        this._isMounted && this.getLatestAssets()
    }

    public componentWillUnmount() {
        this._isMounted = false
    }

    private getLatestAssets = async () => {
        const { ocean } = this.context

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
            this.setState({
                latestAssets: search.results,
                isLoadingLatest: false
            })
        } catch (error) {
            Logger.error(error.message)
            this.setState({ isLoadingLatest: false })
        }
    }

    public render() {
        const { latestAssets, isLoadingLatest } = this.state

        return (
            <>
                <h2 className={styles.title}>Latest published assets</h2>
                <div className={styles.latestAssetsWrap}>
                    {isLoadingLatest ? (
                        <Spinner message="Loading..." />
                    ) : latestAssets && latestAssets.length ? (
                        <div className={styles.latestAssets}>
                            {latestAssets.map((asset: any) => (
                                <AssetTeaser
                                    key={asset.id}
                                    asset={asset}
                                    minimal
                                />
                            ))}
                        </div>
                    ) : (
                        <div>No data sets found.</div>
                    )}
                </div>
            </>
        )
    }
}

AssetsLatest.contextType = User
