import React, { PureComponent } from 'react'
import queryString from 'query-string'
import { History, Location } from 'history'
import { Logger } from '@oceanprotocol/squid'
import SearchResults, {
    SearchResultsState
} from '../components/molecules/SearchResults'
import Route from '../components/templates/Route'
import { User } from '../context'
import Pagination from '../components/molecules/Pagination'
import styles from './Search.module.scss'
import Content from '../components/atoms/Content'
import withTracker from '../hoc/withTracker'

interface SearchProps {
    location: Location
    history: History
}

interface SearchState extends SearchResultsState {
    searchTerm: string
    searchCategories: string
}

class Search extends PureComponent<SearchProps, SearchState> {
    public static contextType = User

    public state = {
        results: [],
        totalResults: 0,
        offset: 25,
        totalPages: 1,
        currentPage: 1,
        isLoading: true,
        searchTerm: '',
        searchCategories: ''
    }

    public async componentDidMount() {
        const { search } = this.props.location
        const { text, page, categories } = queryString.parse(search)

        if (text) {
            this.setState({
                searchTerm: decodeURIComponent(`${text}`)
            })
        }

        if (categories) {
            this.setState({
                searchCategories: decodeURIComponent(`${categories}`)
            })
        }

        // switch to respective page if query string is present
        if (page) {
            const currentPage = Number(page)
            this.setState({ currentPage })
        }

        this.searchAssets()
    }

    private searchAssets = async () => {
        const { ocean } = this.context
        const { offset, currentPage, searchTerm, searchCategories } = this.state

        const queryValues =
            searchCategories !== '' && searchTerm !== ''
                ? { text: [searchTerm], categories: [searchCategories] }
                : searchCategories !== '' && searchTerm === ''
                ? { categories: [searchCategories] }
                : { text: [searchTerm] }

        const searchQuery = {
            offset,
            page: currentPage,
            query: {
                ...queryValues
            },
            sort: {
                created: -1
            }
        }

        try {
            const search = await ocean.assets.query(searchQuery)
            this.setState({
                results: search.results,
                totalResults: search.totalResults,
                totalPages: search.totalPages,
                isLoading: false
            })
        } catch (error) {
            Logger.error(error.message)
            this.setState({ isLoading: false })
        }
    }

    private onPageClick = async (data: { selected: number }) => {
        // react-pagination starts counting at 0, we start at 1
        const toPage = data.selected + 1

        this.props.history.push({
            pathname: this.props.location.pathname,
            search: `?text=${this.state.searchTerm}&page=${toPage}`
        })

        this.setState({ currentPage: toPage, isLoading: true })
        await this.searchAssets()
    }

    public render() {
        const {
            totalResults,
            totalPages,
            currentPage,
            isLoading,
            results,
            searchTerm,
            searchCategories
        } = this.state

        return (
            <Route title="Search" wide>
                <Content wide>
                    {!isLoading && (
                        <h2 className={styles.resultsTitle}>
                            {totalResults} results for{' '}
                            <span>
                                {decodeURIComponent(
                                    searchTerm || searchCategories
                                )}
                            </span>
                        </h2>
                    )}

                    <SearchResults isLoading={isLoading} results={results} />

                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        handlePageClick={this.onPageClick}
                    />
                </Content>
            </Route>
        )
    }
}

export default withTracker(Search)
