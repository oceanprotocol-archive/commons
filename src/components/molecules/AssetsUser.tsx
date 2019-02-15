import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import Asset from '../molecules/Asset'
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
                    $search: 'zoid'
                }
            }
        }
        const assets = await this.context.ocean.searchAssets(queryRequest)
        this.setState({ results: assets })
    }

    public render() {
        return (
            <div className={styles.assetsUser}>
                <h2 className={styles.subTitle}>Your Data Sets</h2>

                {this.state.results.length ? (
                    <div className={styles.assets}>
                        {this.state.results.map((asset, index) => (
                            <Asset key={index} asset={asset} />
                        ))}
                    </div>
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
