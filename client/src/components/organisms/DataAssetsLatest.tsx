import React, { PureComponent } from 'react'
import { Logger } from '@oceanprotocol/squid'
import { Market } from '../../context'
import Spinner from '../atoms/Spinner'
import AssetTeaser from '../molecules/AssetTeaser'
import styles from './DataAssetsLatest.module.scss'
import Fade from 'react-reveal/Fade'

interface DataAssetsLatestState {
    latestAssets?: any[]
    isLoadingLatest?: boolean
}

export default class DataAssetsLatest extends PureComponent<{}, DataAssetsLatestState> {
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
        const { ocean, aquarius } = this.context

        const searchQuery = {
            offset: 15,
            page: 1,
            query: {},
            sort: {
                created: -1
            }
        }

        try {
            const search = ocean ? await ocean.assets.query(searchQuery)
                :await aquarius.queryMetadata(searchQuery)
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
                                <Fade key={asset.id}><AssetTeaser
                                    asset={asset}
                                    minimal
                                /></Fade>
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

DataAssetsLatest.contextType = Market
