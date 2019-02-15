import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../atoms/Spinner'
import Asset from '../molecules/Asset'
import styles from './AssetsUser.module.scss'

export default class AssetsUser extends PureComponent {
    public state = { results: [], isLoading: true }

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

        try {
            const assets = await this.context.ocean.searchAssets(queryRequest)
            this.setState({ results: assets, isLoading: false })
        } catch (error) {
            this.setState({ isLoading: false })
        }
    }

    public render() {
        return (
            <div className={styles.assetsUser}>
                <h2 className={styles.subTitle}>Your Data Sets</h2>

                {this.state.isLoading ? (
                    <Spinner />
                ) : this.state.results.length ? (
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
