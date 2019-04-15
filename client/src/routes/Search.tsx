import React, { PureComponent } from 'react'
import queryString from 'query-string'
import { Logger } from '@oceanprotocol/squid'
import Spinner from '../components/atoms/Spinner'
import Route from '../components/templates/Route'
import { User } from '../context'
import Asset from '../components/molecules/Asset'
import Pagination from '../components/molecules/Pagination'
import styles from './Search.module.scss'

interface SearchProps {
    location: Location
    history: any
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
        currentPage: 1,
        isLoading: true
    }

    private readonly searchTerm = queryString.parse(this.props.location.search)
        .text
    private readonly searchPage = queryString.parse(this.props.location.search)
        .page

    public async componentDidMount() {
        // switch to respective page if query string is present
        if (this.searchPage) {
            const currentPage = Number(this.searchPage)
            await this.setState({ currentPage })
        }

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
            isLoading: false
        })
        Logger.log(`Loaded ${this.state.results.length} assets`)
    }

    private handlePageClick = async (data: { selected: number }) => {
        let toPage = data.selected + 1

        this.props.history.push({
            pathname: this.props.location.pathname,
            search: `?text=${this.searchTerm}&page=${toPage}`
        })

        await this.setState({ currentPage: toPage, isLoading: true })
        await this.searchAssets()
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
                    handlePageClick={this.handlePageClick}
                />
            </Route>
        )
    }
}

Search.contextType = User
