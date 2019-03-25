import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { User } from '../../context/User'
import Spinner from '../atoms/Spinner'
import Asset from '../molecules/Asset'
import styles from './AssetsUser.module.scss'
import { Logger } from '@oceanprotocol/squid'

export default class AssetsUser extends PureComponent {
    public state = { results: [], isLoading: true }

    public componentDidMount() {
        this.searchOcean()
    }

    private async searchOcean() {
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
    }

    public render() {
        return (
            <div className={styles.assetsUser}>
                <h2 className={styles.subTitle}>Your Data Sets</h2>

                {this.state.isLoading ? (
                    <Spinner />
                ) : this.state.results.length ? (
                    <div className={styles.assets}>
                        {this.state.results
                            .filter(asset => !!asset)
                            .map((asset: any) => (
                            <Asset key={asset.id} asset={asset} list />
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

AssetsUser.contextType = User
