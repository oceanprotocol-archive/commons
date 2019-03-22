import React, { Component } from 'react'
import Route from '../components/templates/Route'
import { User } from '../context/User'
import Asset from '../components/molecules/Asset'
import { Logger } from '@oceanprotocol/squid'
import styles from './Search.module.scss'

interface InvoicesState {
    results: any[]
}

export default class Invoices extends Component<{}, InvoicesState> {
    public state = { results: [] }

    public async componentDidMount() {
        // this is currently my published assets
        // TODO: update to invoices
        try {
            const events = await this.context.ocean.keeper.didRegistry.contract.getPastEvents(
                'DIDAttributeRegistered',
                {
                    filter: { _owner: this.context.account },
                    fromBlock: 0,
                    toBlock: 'latest'
                }
            )
            const results = []
            for (const event of events) {
                const ddo = await this.context.ocean.resolveDID(
                    `did:op:${event.returnValues._did.substring(2)}`
                )
                results.push(ddo)
            }
            this.setState({ results })
        } catch (error) {
            Logger.log('Error retrieving invoices:', error)
        }
    }

    public renderResults = () =>
        this.state.results.length ? (
            <div className={styles.results}>
                {this.state.results.map((asset, index) => (
                    <Asset key={index} asset={asset} />
                ))}
            </div>
        ) : (
            <div>No invoices yet</div>
        )

    public render() {
        return (
            <Route title="Your invoices" wide>
                {this.renderResults()}
            </Route>
        )
    }
}

Invoices.contextType = User
