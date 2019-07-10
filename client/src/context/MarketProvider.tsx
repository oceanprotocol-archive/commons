import React, { PureComponent } from 'react'
import { Logger, Ocean } from '@oceanprotocol/squid'
import { Market } from '.'
import formPublish from '../data/form-publish.json'

const categories =
    (formPublish.steps[1].fields &&
        formPublish.steps[1].fields.categories &&
        formPublish.steps[1].fields.categories.options) ||
    []

interface MarketProviderProps {
    ocean: Ocean
}

interface MarketProviderState {
    totalAssets: number
    categories: string[]
    network: string
}

export default class MarketProvider extends PureComponent<
    MarketProviderProps,
    MarketProviderState
> {
    public state = {
        totalAssets: 0,
        categories,
        network: 'Pacific'
    }

    public async componentDidMount() {}

    public async componentDidUpdate(prevProps: any) {
        // Using ocean prop instead of getting it from context to be able to compare.
        // Cause there is no `prevContext`.
        if (prevProps.ocean !== this.props.ocean) {
            await this.getTotalAssets()
            await this.getMarketNetwork()
        }
    }

    private getTotalAssets = async () => {
        const searchQuery = {
            offset: 1,
            page: 1,
            query: {},
            sort: {
                value: 1
            }
        }

        try {
            const { ocean } = this.props
            const search = await ocean.aquarius.queryMetadata(searchQuery)
            this.setState({ totalAssets: search.totalResults })
        } catch (error) {
            Logger.error('Error', error.message)
        }
    }

    private getMarketNetwork = async () => {
        try {
            const { ocean } = this.props
            // Set desired network to whatever Brizo is running in
            const brizo = await ocean.brizo.getVersionInfo()
            const network =
                brizo.network.charAt(0).toUpperCase() + brizo.network.slice(1)
            this.setState({ network })
        } catch (error) {
            Logger.error('Error', error.message)
        }
    }

    public render() {
        return (
            <Market.Provider value={this.state}>
                {this.props.children}
            </Market.Provider>
        )
    }
}
