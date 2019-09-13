import React, { PureComponent, ChangeEvent } from 'react'
import queryString from 'query-string'
import { History, Location } from 'history'
import { Logger, DDO } from '@oceanprotocol/squid'
import Spinner from '../../components/atoms/Spinner'
import Route from '../../components/templates/Route'
import { User } from '../../context'
import Content from '../../components/atoms/Content'
import Button from '../../components/atoms/Button'
import Input from '../../components/atoms/Form/Input'
import withTracker from '../../hoc/withTracker'
import Sidebar from './Sidebar'
import Results from './Results'
import styles from './index.module.scss'

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
    search: string
    category: string
    license: string
}

class Search extends PureComponent<SearchProps, SearchState> {
    public static contextType = User

    public timeout: any = false

    public state = {
        results: [],
        totalResults: 0,
        offset: 25,
        totalPages: 1,
        currentPage: 1,
        isLoading: true,
        search: '',
        category: '',
        license: ''
    }

    public async componentDidMount() {
        const { search } = this.props.location
        const { text, page, categories, license } = queryString.parse(search)

        const update: any = {}
        if (text) {
            update.search = decodeURIComponent(`${text}`)
        }
        if (categories) {
            update.category = decodeURIComponent(`${categories}`)
        }
        if (license) {
            update.license = decodeURIComponent(`${license}`)
        }
        if (page) {
            update.currentPage = Number(page)
        }

        this.setState(update, () => this.searchAssets())
    }

    private searchAssets = async (event?: any) => {
        event && event.preventDefault()

        const { ocean } = this.context
        const { offset, currentPage, search, category, license } = this.state

        let urlString = '?'
        const queryValues: any = {}
        if (search) {
            queryValues.text = [search]
            urlString += `text=${search}&`
        }
        if (category) {
            queryValues.categories = [category]
            urlString += `categories=${category}&`
        }
        if (license) {
            queryValues.license = [license]
            urlString += `license=${license}&`
        }
        if (currentPage !== 1) {
            urlString += `page=${currentPage}&`
        }

        // update url
        this.props.history.push({
            pathname: this.props.location.pathname,
            search: urlString
        })

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

    private handlePageClick = async (data: { selected: number }) => {
        // react-pagination starts counting at 0, we start at 1
        const toPage = data.selected + 1

        this.setState({ currentPage: toPage, isLoading: true }, () =>
            this.searchAssets()
        )
    }

    private inputChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (this.state.search !== event.target.value)
            this.setState({ search: event.target.value })
    }

    public setCategory = (category: string) => {
        this.setState({ category, isLoading: true }, () => this.searchAssets())
    }

    public setLicense = (license: string) => {
        this.setState({ license, isLoading: true }, () => this.searchAssets())
    }

    public render() {
        const {
            isLoading,
            results,
            totalResults,
            search,
            category,
            license,
            totalPages,
            currentPage
        } = this.state

        return (
            <Route title="Search">
                <Content>
                    <form onSubmit={this.searchAssets}>
                        <Input
                            type="search"
                            name="search"
                            label=""
                            placeholder="e.g. shapes of plants"
                            value={search}
                            onChange={this.inputChange}
                            group={
                                <Button primary onClick={this.searchAssets}>
                                    Search
                                </Button>
                            }
                        />
                    </form>
                </Content>
                <Content wide>
                    <div className={styles.content}>
                        <div>
                            {isLoading ? (
                                <Spinner message="Searching..." />
                            ) : (
                                <Results
                                    results={results}
                                    totalResults={totalResults}
                                    totalPages={totalPages}
                                    currentPage={currentPage}
                                    handlePageClick={this.handlePageClick}
                                />
                            )}
                        </div>

                        <Sidebar
                            category={category}
                            license={license}
                            results={results}
                            setCategory={this.setCategory}
                            setLicense={this.setLicense}
                        />
                    </div>
                </Content>
            </Route>
        )
    }
}

export default withTracker(Search)
