import { Logger } from '@oceanprotocol/squid'
import React, { Component } from 'react'
import Button from '../components/atoms/Button'
import { User } from '../context/User'

interface DetailsState {
    ddo: any
    metadata: any
}

interface DetailsProps {
    location: any
    match: any
}

export default class Details extends Component<DetailsProps, DetailsState> {
    public state = { ddo: null, metadata: null }

    public async componentDidMount() {
        const ddo = await this.context.ocean.resolveDID(
            this.props.match.params.did
        )
        const { metadata } = ddo.findServiceByType('Metadata')
        this.setState({ ddo, metadata })
    }

    private purchaseAsset = async (ddo: any) => {
        const account = await this.context.ocean.getAccounts()
        const service = ddo.findServiceByType('Access')
        const serviceAgreementSignatureResult: any = await this.context.ocean.signServiceAgreement(
            ddo.id,
            service.serviceDefinitionId,
            account[0]
        )
        Logger.log(
            'serviceAgreementSignatureResult',
            serviceAgreementSignatureResult
        )

        await this.context.ocean.initializeServiceAgreement(
            ddo.id,
            service.serviceDefinitionId,
            serviceAgreementSignatureResult.serviceAgreementId,
            serviceAgreementSignatureResult.serviceAgreementSignature,
            (files: any) =>
                Logger.log(
                    `Got files, first files length in bytes: ${files[0].length}`
                ),
            account[0]
        )
    }

    private showDetails = (ddo: any) => {
        return (
            <>
                <div>{JSON.stringify(this.state.metadata)}</div>

                <Button onClick={this.purchaseAsset(ddo)}>
                    Purchase asset
                </Button>
            </>
        )
    }

    public render() {
        return (
            <>
                {this.state.metadata ? (
                    this.showDetails(this.state.ddo)
                ) : (
                    <div>Loading</div>
                )}
            </>
        )
    }
}

Details.contextType = User
