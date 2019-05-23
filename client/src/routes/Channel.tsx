import React, { PureComponent } from 'react'
import queryString from 'query-string'
import { History, Location } from 'history'
import { Logger } from '@oceanprotocol/squid'
import Spinner from '../components/atoms/Spinner'
import Route from '../components/templates/Route'
import { User } from '../context'
import Asset from '../components/molecules/Asset'
import Pagination from '../components/molecules/Pagination'
import styles from './Channel.module.scss'
import Content from '../components/atoms/Content'

interface ChannelProps {
    location: Location
    history: History
    match: {
        params: any
    }
}

interface ChannelState {
    results: any[]
    totalResults: number
    offset: number
    totalPages: number
    currentPage: number
    isLoading: boolean
    searchTerm: string
    searchCategories: string
    channel: {
        title: string
        description: string
    }
}

export default class Channel extends PureComponent<ChannelProps, ChannelState> {
    public state = {
        results: [],
        totalResults: 0,
        offset: 25,
        totalPages: 1,
        currentPage: 1,
        isLoading: true,
        searchTerm: '',
        searchCategories: '',
        channel: {
            title: 'AI for Good',
            description:
                'AI 4 Good is an initiative to promote the use of artificial intelligence for good causes, such as fighting poverty, climate change, improving healthcare, safer transportation, and so on. The AI for Good Global Summit is THE leading United Nations platform for global and inclusive dialogue on AI. The Summit is hosted each year in Geneva by the ITU in partnership wutg UN Suster agencies, XPRIZE Foundtation and ACM.'
        }
    }

    public async componentDidMount() {
        const { match } = this.props

        // TODO: use next line to use channel name
        // const category = match.params.channel
        const category = 'Engineering'

        const { page } = queryString.parse(this.props.location.search)

        if (category) {
            await this.setState({
                searchCategories: encodeURIComponent(`${category}`)
            })
        }

        // switch to respective page if query string is present
        if (page) {
            const currentPage = Number(page)
            await this.setState({ currentPage })
        }

        this.getChannelAssets()
    }

    private getChannelAssets = async () => {
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
                ...queryValues,
                price: [-1, 1]
            },
            sort: {
                datePublished: 1
            }
        }

        try {
            const search = await ocean.aquarius.queryMetadata(searchQuery)
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
        let toPage = data.selected + 1

        this.props.history.push({
            pathname: this.props.location.pathname,
            search: `?text=${this.state.searchTerm}&page=${toPage}`
        })

        await this.setState({ currentPage: toPage, isLoading: true })
        await this.getChannelAssets()
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
        const { totalResults, totalPages, currentPage, channel } = this.state
        const { match } = this.props

        return (
            <Route title={channel.title} wide>
                <Content wide>
                    <div>{channel.description}</div>
                    {totalResults > 0 && (
                        <h2
                            className={styles.resultsTitle}
                            dangerouslySetInnerHTML={{
                                __html: `${totalResults} results for <span>${decodeURIComponent(
                                    '' // this.state.channelName
                                )}</span>`
                            }}
                        />
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

Channel.contextType = User
