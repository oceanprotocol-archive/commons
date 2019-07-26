import React, { PureComponent, ChangeEvent } from 'react'
import Button from '../components/atoms/Button'
import Input from '../components/atoms/Form/Input'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import { History, Location } from 'history'
import { Logger } from '@oceanprotocol/squid'
import Spinner from '../components/atoms/Spinner'
import Route from '../components/templates/Route'
import { User } from '../context'
import AssetTeaser from '../components/molecules/AssetTeaser'
import Pagination from '../components/molecules/Pagination'
import styles from './Search.module.scss'
import Content from '../components/atoms/Content'
import withTracker from '../hoc/withTracker'
import data from '../data/form-publish.json'

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
    searchTerm: string
    searchCategories: string
    search: string
    category: string
    license: string
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
        searchCategories: '',
        searchLicense: '',
        search: '',
        category: '',
        license: ''
    }

    public async componentDidMount() {
        const { search } = this.props.location
        const { text, page, categories, license  } = queryString.parse(search)

        let update: any = {}
        if (text) {
            update.searchTerm = decodeURIComponent(`${text}`)
            update.search = decodeURIComponent(`${text}`)
        }
        if (categories) {
           update.searchCategories = decodeURIComponent(`${categories}`)
           update.category = decodeURIComponent(`${categories}`)
        }
        if (license) {
            update.searchLicense = decodeURIComponent(`${license}`)
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
        const queryValues:any = {}
        if(search){
            queryValues.text = [search]
        }
        if(category){
            queryValues.categories = [category]
        }
        if(license){
            queryValues.license = [license]
        }
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

        this.props.history.push({
            pathname: this.props.location.pathname,
            search: `?text=${this.state.searchTerm}&page=${toPage}`
        })

        this.setState({ currentPage: toPage, isLoading: true }, () => this.searchAssets())

    }

    private inputChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            [event.currentTarget.name]: event.currentTarget.value
        } as any)
    }

    private search = (event: ChangeEvent<HTMLInputElement>) => {

        let searchUrl = '?'

        if (this.state.search){
            searchUrl = `${searchUrl}text=${encodeURIComponent(this.state.search)}&`
        }
        if (this.state.category){
            searchUrl = `${searchUrl}categories=${encodeURIComponent(this.state.category)}&`
        }
        if (this.state.license){
            searchUrl = `${searchUrl}license=${encodeURIComponent(this.state.license)}&`
        }
        this.props.history.push({
            pathname: this.props.location.pathname,
            search: searchUrl
        })
        this.setState({
            searchTerm: this.state.search,
            currentPage: 1,
            isLoading: true
        }, () => this.searchAssets())
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
        const { steps }:any = data
        return (
            <Route title="Search" wide>
                <Content wide>
                    <Input
                        type="search"
                        name="search"
                        label="Search for data sets"
                        placeholder="e.g. shapes of plants"
                        value={this.state.search}
                        onChange={this.inputChange}
                        group={
                            <Button primary onClick={this.search}>
                                Search
                            </Button>
                        }
                    />
                    <Input
                        type="select"
                        name="category"
                        label="Data sets from category"
                        placeholder="e.g. Biology"
                        options={steps[1].fields.categories.options}
                        value={this.state.category}
                        onChange={this.inputChange}
                    />
                    <Input
                        type="select"
                        name="license"
                        label="Data sets from license"
                        placeholder="e.g. Biology"
                        options={steps[2].fields.license.options}
                        value={this.state.license}
                        onChange={this.inputChange}
                    />
                    {!this.state.isLoading && (
                        <h2 className={styles.resultsTitle}>
                            {totalResults} results for{' '}
                            <span>
                                {decodeURIComponent(
                                    this.state.searchTerm ||
                                        this.state.searchCategories
                                )}
                            </span>
                        </h2>
                    )}
                    {this.renderResults()}

                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        handlePageClick={this.handlePageClick}
                    />
                </Content>
            </Route>
        )
    }
}

export default withTracker(Search)
