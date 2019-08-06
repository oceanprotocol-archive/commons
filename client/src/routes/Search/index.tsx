import React, { PureComponent, ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import { History, Location } from 'history'
import { Logger } from '@oceanprotocol/squid'
import Spinner from '../../components/atoms/Spinner'
import Route from '../../components/templates/Route'
import { User } from '../../context'
import AssetTeaser from '../../components/molecules/AssetTeaser'
import Pagination from '../../components/molecules/Pagination'
import styles from './index.module.scss'
import Content from '../../components/atoms/Content'
import withTracker from '../../hoc/withTracker'
import Sidebar from './Sidebar'

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

        let update: any = {}
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

    private searchAssets = async () => {
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

    private inputChange = (
        event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
    ) => {
        this.setState({
            [event.currentTarget.name]: event.currentTarget.value
        } as any, () => {
            this.pendingSearch()
        })
    }

    private pendingSearch = () => {
        this.setState({isLoading:true})
        if(this.timeout){
            clearTimeout(this.timeout)
        }
        this.timeout = setTimeout(this.executeSearch,500);
    }

    private executeSearch=()=>{
        this.timeout = false
        this.searchAssets()
    }

    public setCategory = (category: string) => {
        this.setState({ category, isLoading: true }, () => this.searchAssets())
    }

    public setLicense = (license: string) => {
        this.setState({ license, isLoading: true }, () => this.searchAssets())
    }

    public renderResults = () =>
        this.state.isLoading ? (
            <Spinner message="Searching..." />
        ) : this.state.results && this.state.results.length ? (
            <div className={styles.results}>
                {this.state.results.map((asset: any) => (
                    <AssetTeaser key={asset.id} asset={asset} />
                ))}
            </div>
        ) : (
            <div className={styles.empty}>
                <p>No Data Sets Found.</p>
                <Link to="/publish">+ Publish A Data Set</Link>
            </div>
        )

    public render() {
        const { totalResults, totalPages, currentPage } = this.state

        return (
            <Route title="Search" wide>
                <Content wide>
                    <div className={styles.content}>
                        <Sidebar
                            search={this.state.search}
                            inputChange={this.inputChange}
                            category={this.state.category}
                            license={this.state.license}
                            setCategory={this.setCategory}
                            setLicense={this.setLicense}
                        />

                        <div>
                            {!this.state.isLoading && (
                                <h2 className={styles.resultsTitle}>
                                    {totalResults} results for{' '}
                                    <span>
                                        {decodeURIComponent(
                                            this.state.search ||
                                                this.state.category
                                        )}
                                    </span>
                                </h2>
                            )}

                            {this.renderResults()}

                            {!this.state.isLoading && (
                                <Pagination
                                    totalPages={totalPages}
                                    currentPage={currentPage}
                                    handlePageClick={this.handlePageClick}
                                />
                            )}
                        </div>
                    </div>
                </Content>
            </Route>
        )
    }
}

export default withTracker(Search)
