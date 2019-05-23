import React, { ChangeEvent, Component, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { User } from '../context'
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
import formPublish from '../data/form-publish.json'
import { History } from 'history'
import Content from '../components/atoms/Content'

interface HomeProps {
    history: History
}

interface HomeState {
    search?: string
    categoryAssets?: any[]
    isLoadingCategory?: boolean
    latestAssets?: any[]
    isLoadingLatest?: boolean
}

const categories =
    (formPublish.steps[1].fields &&
        formPublish.steps[1].fields.categories &&
        formPublish.steps[1].fields.categories.options) ||
    []

export default class Home extends Component<HomeProps, HomeState> {
    public static contextType = User

    public state = {
        search: '',
        categoryAssets: [],
        isLoadingCategory: true,
        latestAssets: [],
        isLoadingLatest: true
    }

    public async componentDidMount() {
        this.getCategoryAssets()
        this.getLatestAssets()
    }

    private getCategoryAssets = async () => {
        const { ocean } = this.context

        const searchQuery = {
            offset: 25,
            page: 1,
            query: {
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
                categoryAssets: search.results,
                isLoadingCategory: false
            })
        } catch (error) {
            Logger.error(error.message)
            this.setState({ isLoadingCategory: false })
        }
    }

    private getLatestAssets = async () => {
        const { ocean } = this.context

        const searchQuery = {
            offset: 3,
            page: 1,
            query: {
                price: [-1, 1]
            },
            sort: {
                created: -1
            }
        }

        try {
            const search = await ocean.aquarius.queryMetadata(searchQuery)
            this.setState({
                latestAssets: search.results,
                isLoadingLatest: false
            })
        } catch (error) {
            Logger.error(error.message)
            this.setState({ isLoadingLatest: false })
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
        const {
            categoryAssets,
            isLoadingCategory,
            latestAssets,
            isLoadingLatest,
            search
        } = this.state

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
                    <h2 className={styles.title}>
                        <Link to="/channels/ai-for-good">AI for Good</Link>
                    </h2>
                    <div>
                        {isLoadingCategory ? (
                            <Spinner message="Loading..." />
                        ) : categoryAssets && categoryAssets.length ? (
                            <div className={styles.results}>
                                {categoryAssets.map((asset: any) => (
                                    <Asset key={asset.id} asset={asset} />
                                ))}
                            </div>
                        ) : (
                            <div>No data sets found.</div>
                        )}
                    </div>

                    <h2 className={styles.title}>Latest published assets</h2>
                    <div>
                        {isLoadingLatest ? (
                            <Spinner message="Loading..." />
                        ) : latestAssets && latestAssets.length ? (
                            <div className={styles.results}>
                                {latestAssets.map((asset: any) => (
                                    <Asset key={asset.id} asset={asset} />
                                ))}
                            </div>
                        ) : (
                            <div>No data sets found.</div>
                        )}
                    </div>
                </Content>

                <Content>
                    <h2 className={styles.title}>Explore Categories</h2>
                    <div className={styles.categories}>
                        {categories
                            .filter(category => category !== 'AI For Good')
                            .sort((a, b) => a.localeCompare(b))
                            .map((category: string) => (
                                <Link
                                    to={`/search?categories=${category}`}
                                    key={category}
                                    className={styles.category}
                                >
                                    <CategoryImage category={category} />
                                    <h3>{category}</h3>
                                </Link>
                            ))}
                    </div>
                </Content>
            </Route>
        )
    }
}
