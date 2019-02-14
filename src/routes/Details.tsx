import { Logger } from '@oceanprotocol/squid'
import React, { Component } from 'react'
import Route from '../components/templates/Route'
import Button from '../components/atoms/Button'
import { User } from '../context/User'
import quertString from 'query-string'

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
        try {
            const account = await this.context.ocean.getAccounts()
            const service = ddo.findServiceByType('Access')
            const serviceAgreementSignatureResult: any = await this.context.ocean.signServiceAgreement(
                ddo.id,
                service.serviceDefinitionId,
                account[0]
            )
            Logger.log(service)
            await this.context.ocean.initializeServiceAgreement(
                ddo.id,
                service.serviceDefinitionId,
                serviceAgreementSignatureResult.serviceAgreementId,
                serviceAgreementSignatureResult.serviceAgreementSignature,
                (files: any) => {
                    Logger.log('downloading files', files)
                    files.forEach((file: any) => {
                        const parsedUrl: any = quertString.parseUrl(file)
                        setTimeout(() => {
                            // eslint-disable-next-line
                            window.open(parsedUrl.query.url)
                        }, 100)
                    })
                },
                account[0]
            )
        } catch (e) {
            Logger.log('error', e)
        }
    }

    private showDetails = (ddo: any) => {
        return (
            <>
                <div>{JSON.stringify(this.state.metadata)}</div>

                <Button onClick={() => this.purchaseAsset(ddo)}>
                    Purchase asset
                </Button>
            </>
        )
    }

    public render() {
        return (
            <Route title={'Details'}>
                {this.state.metadata ? (
                    this.showDetails(this.state.ddo)
                ) : (
                    <div>Loading</div>
                )}
            </Route>
        )
    }
}

Details.contextType = User
