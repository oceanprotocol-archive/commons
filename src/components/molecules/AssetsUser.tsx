import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import styles from './AssetsUser.module.scss'

export default class AssetsUser extends PureComponent {
    public state = { results: [] }

    public componentDidMount() {
        this.searchOcean()
    }

    private async searchOcean() {
        const queryRequest: any = {
            offset: 100,
            page: 0,
            query: {
                // TODO: query all assets published by current active account
                $text: {
                    $search: 'account ID'
                }
            }
        }
        const assets = await this.context.ocean.searchAssets(queryRequest)
        this.setState({ results: assets })
    }

    // TODO: this should be removed and replaced by Asset.tsx component
    private renderAssetBox = (asset: any) => {
        const { metadata } = asset.findServiceByType('Metadata')
        return (
            <Link key={asset.id} to={`/asset/${asset.id}`}>
                <div>{metadata.base.name}</div>
                <div>{metadata.base.description}</div>
            </Link>
        )
    }

    public render() {
        return (
            <div className={styles.assetsUser}>
                <h2 className={styles.subTitle}>Your Data Sets</h2>

                {this.state.results.length ? (
                    this.state.results.map(asset => this.renderAssetBox(asset))
                ) : (
                    <div>
                        <p>None yet.</p>
                        <Link to="/publish">+ Publish A Data Set</Link>
                    </div>
                )}
            </div>
        )
    }
}
