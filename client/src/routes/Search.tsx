import React, { PureComponent } from 'react'
import queryString from 'query-string'
import { Logger } from '@oceanprotocol/squid'
import Spinner from '../components/atoms/Spinner'
import Route from '../components/templates/Route'
import { User } from '../context/User'
import Asset from '../components/molecules/Asset'
import styles from './Search.module.scss'

interface SearchProps {
    location: Location
    history: History
}

interface SearchState {
    assets: any[]
    isLoading: boolean
    page: number
}

export default class Search extends PureComponent<SearchProps, SearchState> {
    public state = {
        assets: [],
        isLoading: true,
        page: 0
    }

    private readonly searchTerm = queryString.parse(this.props.location.search)
        .text

    public componentDidMount() {
        this.searchAssets()
    }

    private searchAssets = async () => {
        const searchQuery = {
            offset: 100,
            page: this.state.page,
            query: {
                text: [this.searchTerm],
                price: [-1, 1]
            },
            sort: {
                datePublished: 1
            }
        }

        const assets = await this.context.ocean.aquarius.queryMetadata(
            searchQuery
        )
        this.setState({ assets, isLoading: false })
        Logger.log(`Loaded ${assets.length} assets`)
    }

    public renderResults = () =>
        this.state.isLoading ? (
            <Spinner message="Searching..." />
        ) : this.state.assets.length ? (
            <div className={styles.results}>
                {this.state.assets.map((asset: any) => (
                    <Asset key={asset.id} asset={asset} />
                ))}
            </div>
        ) : (
            <div>No data sets found.</div>
        )

    public render() {
        return (
            <Route
                title={`Search Results for <span>${this.searchTerm}</span>`}
                titleReverse
                wide
            >
                {this.renderResults()}
            </Route>
        )
    }
}

Search.contextType = User
