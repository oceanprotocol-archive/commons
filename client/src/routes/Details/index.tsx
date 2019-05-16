import React, { Component } from 'react'
import { DDO, MetaData, Logger } from '@oceanprotocol/squid'
import Route from '../../components/templates/Route'
import Spinner from '../../components/atoms/Spinner'
import { User } from '../../context'
import AssetDetails from './AssetDetails'
import stylesApp from '../../App.module.scss'

interface DetailsProps {
    location: Location
    match: {
        params: {
            did: string
        }
    }
}

interface DetailsState {
    ddo: DDO
    metadata: MetaData
}

export default class Details extends Component<DetailsProps, DetailsState> {
    public state = {
        ddo: ({} as any) as DDO,
        metadata: ({ base: { name: '' } } as any) as MetaData
    }

    public async componentDidMount() {
        this.getData()
    }

    private async getData() {
        try {
            const { ocean } = this.context
            const ddo = await ocean.assets.resolve(this.props.match.params.did)
            const { metadata } = ddo.findServiceByType('Metadata')
            this.setState({ ddo, metadata })
        } catch (error) {
            Logger.error(error.message)
        }
    }

    public render() {
        const { metadata, ddo } = this.state

        return metadata.base.name !== '' ? (
            <Route title={metadata.base.name}>
                <AssetDetails metadata={metadata} ddo={ddo} />
            </Route>
        ) : (
            <div className={stylesApp.loader}>
                <Spinner message={'Loading asset...'} />
            </div>
        )
    }
}

Details.contextType = User
