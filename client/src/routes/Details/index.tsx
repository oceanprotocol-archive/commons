import React, { Component } from 'react'
import { Logger } from '@oceanprotocol/squid'
import queryString from 'query-string'
import Route from '../../components/templates/Route'
import Spinner from '../../components/atoms/Spinner'
import { User } from '../../context/User'
import AssetDetails from './AssetDetails'
import stylesApp from '../../App.module.scss'
import { serviceHost, servicePort, serviceScheme } from '../../config'

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
        const ddo = await this.context.ocean.resolveDID(
            this.props.match.params.did
        )
        const { metadata } = ddo.findServiceByType('Metadata')
        this.setState({ ddo, metadata: { base: metadata.base } })
    }

    private purchaseAsset = async (ddo: any) => {
        try {
            const account = await this.context.ocean.getAccounts()
            const service = ddo.findServiceByType('Access')
            const serviceAgreementSignatureResult = await this.context.ocean.signServiceAgreement(
                ddo.id,
                service.serviceDefinitionId,
                account[0]
            )
            await this.context.ocean.initializeServiceAgreement(
                ddo.id,
                service.serviceDefinitionId,
                serviceAgreementSignatureResult.agreementId,
                serviceAgreementSignatureResult.signature,
                (files: any) => {
                    Logger.log('downloading files', files)
                    files.forEach((file: any) => {
                        const parsedUrl: any = queryString.parseUrl(file)
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

    private reportAsset = async (ddo: any) => {
        try {
            const account = await this.context.account
            const signature = await this.context.web3.eth.personal.sign(
                `You are reporting ${ddo.id}`,
                account,
                null
            )

            try {
                const response = await fetch(
                    `${serviceScheme}://${serviceHost}:${servicePort}/api/v1/report`,
                    {
                        method: 'POST',
                        body: JSON.stringify({ did: ddo.id, signature }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                const res = await response.json()
                // console.log(res)
            } catch (error) {
                // error
            }
        } catch (error) {
            // console.log(error)
        }
    }

    private retireAsset = async (ddo: any) => {
        try {
            const account = await this.context.account
            const signature = await this.context.web3.eth.personal.sign(
                `You are retiring ${ddo.id}`,
                account,
                null
            )
            try {
                const response = await fetch(
                    `${serviceScheme}://${serviceHost}:${servicePort}/api/v1/retire`,
                    {
                        method: 'POST',
                        body: JSON.stringify({ did: ddo.id, signature }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                const res = await response.json()
                // console.log(res)
            } catch (error) {
                // error
            }
        } catch (error) {
            // console.log(error)
        }
    }

    private signalAsset = async (ddo: any) => {}

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
                        signalAsset={this.signalAsset}
                        reportAsset={this.reportAsset}
                        retireAsset={this.retireAsset}
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
