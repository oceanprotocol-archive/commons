import React, { Component } from 'react'
import Route from '../components/templates/Route'
import { User } from '../context/User'
import Asset from '../components/molecules/Asset'
import styles from './Search.module.scss'

interface InvoicesState {
    results: any[]
}

export default class Invoices extends Component<{}, InvoicesState> {
    public state = { results: [] }

    public async componentDidMount() {
        /*
        TODO:
        - squid-js with exposed contracts
        - request user to sign (unlock account) to get public key? retrieve it form previous signatures?
        - subscribe to the `AccessSecretStoreCondition.Fulfill` event filtering by `_grantee` : https://github.com/oceanprotocol/keeper-contracts/blob/release/v0.8/contracts/conditions/AccessSecretStoreCondition.sol#L13
        AccessSecretStoreCondition.Fulfill({_grantee: 'public key'}, { fromBlock: 0, toBlock: 'latest' }).get((error, eventResult) => {
        if (error)
            console.log('Error in myEvent event handler: ' + error);
        else
            console.log('events: ' + JSON.stringify(eventResult.args));
        });
        */
        const assets = await this.context.ocean.assets.search('')
        this.setState({ results: assets })
    }

    public renderResults = () =>
        this.state.results.length ? (
            <div className={styles.results}>
                {this.state.results.map(asset => (
                    <Asset key={asset} asset={asset} />
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
