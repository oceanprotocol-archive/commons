import React, { ChangeEvent, Component, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { User, Market } from '../context'
import { Logger } from '@oceanprotocol/squid'
import Spinner from '../components/atoms/Spinner'
import Asset from '../components/molecules/Asset'
import CategoryImage from '../components/atoms/CategoryImage'
import Button from '../components/atoms/Button'
import Form from '../components/atoms/Form/Form'
import Input from '../components/atoms/Form/Input'
import Route from '../components/templates/Route'
import styles from './Home.module.scss'

import meta from '../data/meta.json'
import { History } from 'history'
import Content from '../components/atoms/Content'
import channels from '../data/channels.json'
import AssetsLatest from '../components/organisms/AssetsLatest'

// AI for Good channel
const channel = channels.items
    .filter(({ slug }) => slug === 'ai-for-good')
    .map(channel => channel)[0]
const { title, slug, teaser } = channel

interface HomeProps {
    history: History
}

interface HomeState {
    search?: string
    channelAssets?: any[]
    isLoadingChannel?: boolean
}

export default class Home extends Component<HomeProps, HomeState> {
    public static contextType = User

    public state = {
        search: '',
        channelAssets: [],
        isLoadingChannel: true
    }

    public async componentDidMount() {
        this.getChannelAssets()
    }

    private getChannelAssets = async () => {
        const { ocean } = this.context

        const searchQuery = {
            offset: 4,
            page: 1,
            query: {
                // TODO: remove dummy category
                // categories: [title],
                categories: ['Engineering'],
                price: [-1, 1]
            },
            sort: {
                datePublished: 1
            }
        }

        try {
            const search = await ocean.aquarius.queryMetadata(searchQuery)
            this.setState({
                channelAssets: search.results,
                isLoadingChannel: false
            })
        } catch (error) {
            Logger.error(error.message)
            this.setState({ isLoadingChannel: false })
        }
    }

    private inputChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    private searchAssets = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        this.props.history.push(`/search?text=${this.state.search}`)
    }

    public render() {
        const { channelAssets, isLoadingChannel, search } = this.state

        return (
            <Route
                title={meta.title}
                description={meta.description}
                className={styles.home}
            >
                <Content>
                    <Form onSubmit={this.searchAssets} minimal>
                        <Input
                            type="search"
                            name="search"
                            label="Search for data sets"
                            placeholder="e.g. shapes of plants"
                            value={search}
                            onChange={this.inputChange}
                            group={
                                <Button primary disabled={!search}>
                                    Search
                                </Button>
                            }
                        />
                    </Form>
                </Content>

                <Content wide>
                    <div className={styles.channel}>
                        <div>
                            <div>
                                <h2 className={styles.channelTitle}>
                                    <Link to={`/channels/${slug}`}>
                                        {title} →
                                    </Link>
                                </h2>
                                <p>{teaser}</p>
                            </div>
                        </div>
                        <div>
                            {isLoadingChannel ? (
                                <Spinner message="Loading..." />
                            ) : channelAssets && channelAssets.length ? (
                                <div className={styles.channelResults}>
                                    {channelAssets.map((asset: any) => (
                                        <Asset key={asset.id} asset={asset} />
                                    ))}
                                </div>
                            ) : (
                                <div>No data sets found.</div>
                            )}
                        </div>
                    </div>

                    <AssetsLatest />
                </Content>

                <Content wide>
                    <h2 className={styles.title}>Explore Categories</h2>
                    <div className={styles.categories}>
                        <Market.Consumer>
                            {({ categories }) =>
                                categories
                                    .filter(
                                        category => category !== 'AI For Good'
                                    )
                                    .sort((a, b) => a.localeCompare(b)) // sort alphabetically
                                    .map((category: string) => (
                                        <Link
                                            to={`/search?categories=${category}`}
                                            key={category}
                                            className={styles.category}
                                        >
                                            <CategoryImage
                                                category={category}
                                            />
                                            <h3>{category}</h3>
                                        </Link>
                                    ))
                            }
                        </Market.Consumer>
                    </div>
                </Content>
            </Route>
        )
    }
}
