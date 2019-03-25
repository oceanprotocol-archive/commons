import React, { Component } from 'react'
import Route from '../components/templates/Route'
import { User } from '../context/User'
import Asset from '../components/molecules/Asset'
import { Logger } from '@oceanprotocol/squid'

interface InvoicesState {
    results: any[]
}

export default class Invoices extends Component<{}, InvoicesState> {
    public state = { results: [] }

    public async componentDidMount() {
        // this is currently my published assets
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
                } else {
                    const results = []
                    for (const event of events) {
                        const ddo = await this.context.ocean.assets.resolve(
                            `did:op:${event.returnValues._did.substring(2)}`
                        )
                        results.push(ddo)
                    }
                    this.setState({ results })
                }
            }
        )
    }

    public renderResults = () =>
        this.state.results.length ? (
            this.state.results
                .filter(asset => !!asset)
                .map((asset, index) => (
                    <Asset key={index} asset={asset} list />
            ))
        ) : (
            <div>No invoices yet</div>
        )

    public render() {
        return <Route title="History">{this.renderResults()}</Route>
    }
}

Invoices.contextType = User
