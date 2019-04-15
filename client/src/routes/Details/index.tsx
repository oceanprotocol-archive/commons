import React, { Component } from 'react'
import Route from '../../components/templates/Route'
import Spinner from '../../components/atoms/Spinner'
import { User } from '../../context'
import AssetDetails from './AssetDetails'
import stylesApp from '../../App.module.scss'

interface DetailsProps {
    location: Location
    match: any
}

interface DetailsState {
    ddo: any
    metadata: { base: { name: string } }
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
