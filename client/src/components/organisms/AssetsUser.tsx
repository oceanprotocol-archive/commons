import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { Logger } from '@oceanprotocol/squid'
import { User } from '../../context/User'
import Spinner from '../atoms/Spinner'
import Asset from '../molecules/Asset'
import styles from './AssetsUser.module.scss'

export default class AssetsUser extends PureComponent<
    { list?: boolean; recent?: number },
    { results: any[]; isLoading: boolean }
> {
    public state = { results: [], isLoading: true }

    public componentDidMount() {
        this.searchOcean()
    }

    private async searchOcean() {
        if (this.context.account) {
            this.context.ocean.keeper.didRegistry.contract.getPastEvents(
                'DIDAttributeRegistered',
                {
                    filter: { _owner: this.context.account },
                    fromBlock: 0,
                    toBlock: 'latest'
                },
                async (error: any, events: any) => {
                    if (error) {
                        Logger.log('error retrieving', error)
                        this.setState({ isLoading: false })
                    } else {
                        const results = []
                        for (const event of events) {
                            const ddo = await this.context.ocean.assets.resolve(
                                `did:op:${event.returnValues._did.substring(2)}`
                            )
                            results.push(ddo)
                        }
                        this.setState({ results, isLoading: false })
                    }
                }
            )
        } else {
            this.setState({ isLoading: false })
        }
    }

    public render() {
        return (
            this.context.isNile &&
            this.context.account && (
                <div className={styles.assetsUser}>
                    {this.props.recent && (
                        <h2 className={styles.subTitle}>
                            Your Latest Published Data Sets
                        </h2>
                    )}

                    {this.state.isLoading ? (
                        <Spinner />
                    ) : this.state.results.length ? (
                        <>
                            {this.state.results
                                .slice(
                                    0,
                                    this.props.recent
                                        ? this.props.recent
                                        : undefined
                                )
                                .filter(asset => !!asset)
                                .map((asset: any) => (
                                    <Asset
                                        list={this.props.list}
                                        key={asset.id}
                                        asset={asset}
                                    />
                                ))}
                            {this.props.recent && (
                                <Link className={styles.link} to={'/history'}>
                                    All Data Sets
                                </Link>
                            )}
                        </>
                    ) : (
                        <div className={styles.empty}>
                            <p>No Data Sets Yet.</p>
                            <Link to="/publish">+ Publish A Data Set</Link>
                        </div>
                    )}
                </div>
            )
        )
    }
}

AssetsUser.contextType = User
