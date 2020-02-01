import React, { PureComponent } from 'react'
import { Logger } from '@oceanprotocol/squid'
import { History } from 'history'
import Route from '../../components/templates/Route'
import { User } from '../../context'
import Pagination from '../../components/molecules/Pagination'
import SearchResults, { SearchResultsState } from '../molecules/SearchResults'
import Content from '../../components/atoms/Content'
import channels from '../../data/channels.json'
import CategoryImage from '../atoms/CategoryImage'

interface ChannelProps {
    history: History
    match: {
        params: {
            channel: string
        }
    }
}

interface ChannelState extends SearchResultsState {
    title: string
    description: string
}

export default class Channel extends PureComponent<ChannelProps, ChannelState> {
    // get content data based on received channel param
    public channel = channels.items
        .filter(({ tag }) => tag === this.props.match.params.channel)
        .map(channel => channel)[0]

    public state = {
        results: [],
        totalResults: 0,
        offset: 25,
        totalPages: 1,
        currentPage: 1,
        isLoading: true,
        title: this.channel.title,
        description: this.channel.description
    }

    public async componentDidMount() {
        this.getChannelAssets()
    }

    private getChannelAssets = async () => {
        const { ocean } = this.context
        const { offset, currentPage } = this.state

        const searchQuery = {
            offset,
            page: currentPage,
            query: {
                tags: [this.channel.tag]
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

        this.props.history.push({ search: `?page=${toPage}` })

        this.setState({
            currentPage: toPage,
            isLoading: true
        })
        await this.getChannelAssets()
    }

    public render() {
        const {
            title,
            description,
            totalPages,
            currentPage,
            isLoading,
            results
        } = this.state

        return (
            <Route
                title={title}
                description={description}
                image={<CategoryImage header category={title} />}
            >
                <Content wide>
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

Channel.contextType = User
