import React, { Component } from 'react'
import { Logger } from '@oceanprotocol/squid'
import queryString from 'query-string'
import Route from '../../components/templates/Route'
import Spinner from '../../components/atoms/Spinner'
import { User } from '../../context/User'
import AssetDetails from './AssetDetails'
import stylesApp from '../../App.module.scss'

interface DetailsState {
    ddo: any
    metadata: { base: { name: string } }
}

interface DetailsProps {
    location: any
    match: any
}

export default class Details extends Component<DetailsProps, DetailsState> {
    public state = { ddo: {}, metadata: { base: { name: '' } } }

    public async componentDidMount() {
        const ddo = await this.context.ocean.assets.resolve(
            this.props.match.params.did
        )
        const { metadata } = ddo.findServiceByType('Metadata')
        this.setState({ ddo, metadata: { base: metadata.base } })
    }

    private purchaseAsset = async (ddo: any) => {
        try {
            const account = await this.context.ocean.accounts.list()
            const accessService = ddo.findServiceByType('Access')
            const agreementId = await this.context.ocean.assets.order(
                ddo.id,
                accessService.serviceDefinitionId,
                account[0]
            )
            Logger.log('agreementId', agreementId)
        } catch (e) {
            Logger.log('error', e)
        }
    }

    public render() {
        const { metadata, ddo } = this.state

        return (
            <Route
                title={metadata.base ? metadata.base.name : 'Loading Details'}
            >
                {metadata && metadata.base.name ? (
                    <AssetDetails
                        metadata={metadata}
                        ddo={ddo}
                        purchaseAsset={this.purchaseAsset}
                    />
                ) : (
                    <div className={stylesApp.loader}>
                        <Spinner message={'Loading asset...'} />
                    </div>
                )}
            </Route>
        )
    }
}

Details.contextType = User
