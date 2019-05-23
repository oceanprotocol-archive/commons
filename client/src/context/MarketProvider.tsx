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
}

export default class MarketProvider extends PureComponent<
    MarketProviderProps,
    MarketProviderState
> {
    public state = {
        totalAssets: 0,
        categories
    }

    public async componentDidMount() {}

    public async componentDidUpdate(prevProps: any) {
        // Using ocean prop instead of getting it from context to be able to compare.
        // Cause there is no `prevContext`.
        if (prevProps.ocean !== this.props.ocean) {
            await this.getTotalAssets()
        }
    }

    private getTotalAssets = async () => {
        const searchQuery = {
            offset: 1,
            page: 1,
            query: {
                price: [-1, 1]
            },
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

    public render() {
        return (
            <Market.Provider value={this.state}>
                {this.props.children}
            </Market.Provider>
        )
    }
}
