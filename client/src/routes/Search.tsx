import React, { Component } from 'react'
import queryString from 'query-string'
import { Logger } from '@oceanprotocol/squid'
import Spinner from '../components/atoms/Spinner'
import Route from '../components/templates/Route'
import { User } from '../context/User'
import Asset from '../components/molecules/Asset'
import styles from './Search.module.scss'

interface SearchState {
    results: any[]
    isLoading: boolean
}

interface SearchProps {
    location: any
    history: any
}

export default class Search extends Component<SearchProps, SearchState> {
    public state = { results: [], isLoading: true, page: 0 }

    public async componentDidMount() {
        const searchParams = queryString.parse(this.props.location.search)
        const { text } = searchParams

        const searchQuery = {
            text,
            offset: 100,
            page: 0,
            query: {
                price: [-1, 1]
            },
            sort: {
                datePublished: 1
            }
        }

        const assets = await this.context.ocean.aquarius.queryMetadataByText(
            searchQuery
        )
        this.setState({ results: assets, isLoading: false })
        Logger.log(`Loaded ${assets.length} assets`)
    }

    public renderResults = () =>
        this.state.isLoading ? (
            <Spinner message="Searching..." />
        ) : this.state.results.length ? (
            <div className={styles.results}>
                {this.state.results.map((asset: any) => (
                    <Asset key={asset.id} asset={asset} />
                ))}
            </div>
        ) : (
            <div>No data sets found.</div>
        )

    public render() {
        const searchTerm = queryString.parse(this.props.location.search).text

        return (
            <Route
                title={`Search Results for <span>${searchTerm}</span>`}
                titleReverse
                wide
            >
                {this.renderResults()}
            </Route>
        )
    }
}

Search.contextType = User
