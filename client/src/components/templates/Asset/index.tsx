import React, { Component } from 'react'
import { DDO, MetaData, Logger } from '@oceanprotocol/squid'
import Route from '../Route'
import Spinner from '../../atoms/Spinner'
import { User } from '../../../context'
import AssetDetails from './AssetDetails'
import stylesApp from '../../../App.module.scss'
import Content from '../../atoms/Content'
import CategoryImage from '../../atoms/CategoryImage'
import styles from './index.module.scss'

interface AssetProps {
    match: {
        params: {
            did: string
        }
    }
}

interface AssetState {
    ddo: DDO
    metadata: MetaData
    error: string
}

export default class Asset extends Component<AssetProps, AssetState> {
    public state = {
        ddo: ({} as any) as DDO,
        metadata: ({ base: { name: '' } } as any) as MetaData,
        error: ''
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
            this.setState({
                error: `We encountered an error: ${error.message}.`
            })
        }
    }

    public render() {
        const { metadata, ddo, error } = this.state
        const isLoading = metadata.base.name === ''

        return isLoading ? (
            <div className={stylesApp.loader}>
                <Spinner message={'Loading asset...'} />
            </div>
        ) : error !== '' ? (
            <div className={styles.error}>{error}</div>
        ) : (
            <Route
                title={metadata.base.name}
                image={
                    metadata.base.categories && (
                        <CategoryImage
                            header
                            dimmed
                            category={metadata.base.categories[0]}
                        />
                    )
                }
            >
                <Content>
                    <AssetDetails metadata={metadata} ddo={ddo} />
                </Content>
            </Route>
        )
    }
}

Asset.contextType = User
