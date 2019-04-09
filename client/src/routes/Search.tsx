import React, { PureComponent } from 'react'
import queryString from 'query-string'
import { Logger } from '@oceanprotocol/squid'
import Spinner from '../components/atoms/Spinner'
import Route from '../components/templates/Route'
import { User } from '../context/User'
import Asset from '../components/molecules/Asset'
import Pagination from '../components/molecules/Pagination'
import styles from './Search.module.scss'

interface SearchProps {
    location: Location
    history: History
}

interface SearchState {
    results: any[]
    totalResults: number
    offset: number
    totalPages: number
    currentPage: number
    isLoading: boolean
}

export default class Search extends PureComponent<SearchProps, SearchState> {
    public state = {
        results: [],
        totalResults: 0,
        offset: 25,
        totalPages: 1,
        currentPage: 0,
        isLoading: true
    }

    private readonly searchTerm = queryString.parse(this.props.location.search)
        .text

    public componentDidMount() {
        this.searchAssets()
    }

    private searchAssets = async () => {
        const searchQuery = {
            offset: this.state.offset,
            page: this.state.currentPage,
            query: {
                text: [this.searchTerm],
                price: [-1, 1]
            },
            sort: {
                datePublished: 1
            }
        }

        const search = await this.context.ocean.aquarius.queryMetadata(
            searchQuery
        )
        this.setState({
            results: search.results,
            totalResults: search.totalResults,
            totalPages: search.totalPages,
            currentPage: search.page, // first page is always 0 in response
            isLoading: false
        })
        Logger.log(`Loaded ${this.state.results.length} assets`)
    }

    private setPage = (page: number) => {
        this.setState({ currentPage: page })
        this.searchAssets()
    }

    public renderResults = () =>
        this.state.isLoading ? (
            <Spinner message="Searching..." />
        ) : this.state.results && this.state.results.length ? (
            <div className={styles.results}>
                {this.state.results.map((asset: any) => (
                    <Asset key={asset.id} asset={asset} />
                ))}
            </div>
        ) : (
            <div>No data sets found.</div>
        )

    public render() {
        const { totalResults, totalPages, currentPage } = this.state

        return (
            <Route
                title={`${
                    totalResults > 0 ? totalResults : ''
                } Results for <span>${this.searchTerm}</span>`}
                titleReverse
                wide
            >
                {this.renderResults()}

                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    prevPage={currentPage - 1}
                    setPage={this.setPage}
                />
            </Route>
        )
    }
}

Search.contextType = User
