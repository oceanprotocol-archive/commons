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
        this.getUserAssets()
    }

    private async getUserAssets() {
        try {
            const userEvents = await this.context.ocean.keeper.didRegistry.contract.getPastEvents(
                'DIDAttributeRegistered',
                {
                    filter: { _owner: this.context.account },
                    fromBlock: 0,
                    toBlock: 'latest'
                }
            )
            const results = []
            for (const event of userEvents) {
                const ddo = await this.context.ocean.resolveDID(
                    `did:op:${event.returnValues._did.substring(2)}`
                )
                results.push(ddo)
            }
            this.setState({ results, isLoading: false })
        } catch (error) {
            Logger.log('Error getting user assets:', error)
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

AssetsUser.contextType = User
