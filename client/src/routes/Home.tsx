import React, { ChangeEvent, Component, FormEvent } from 'react'
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
import { History } from 'history'

interface HomeProps {
    history: History
}

interface HomeState {
    search?: string
    categoryAssets?: Array<any>
    isLoading?: boolean
}

const categories = [
    'AI For Good',
    'Image Recognition',
    'Dataset Of Datasets',
    'Language',
    'Performing Arts',
    'Visual Arts & Design',
    'Philosophy',
    'History',
    'Theology',
    'Anthropology & Archeology',
    'Sociology',
    'Psychology',
    'Politics',
    'Interdisciplinary',
    'Economics & Finance',
    'Demography',
    'Biology',
    'Chemistry',
    'Physics & Energy',
    'Earth & Climate',
    'Space & Astronomy',
    'Mathematics',
    'Computer Technology',
    'Engineering',
    'Agriculture & Bio Engineering',
    'Transportation',
    'Urban Planning',
    'Medicine',
    'Business & Management',
    'Sports & Recreation',
    'Communication & Journalism',
    'Deep Learning',
    'Law',
    'Other'
]

class Home extends Component<HomeProps, HomeState> {
    public state = {
        search: '',
        categoryAssets: [],
        isLoading: true
    }

    public async componentDidMount() {
        this.getCategoryAssets()
    }

    private getCategoryAssets = async () => {
        const { ocean } = this.context

        const searchQuery = {
            offset: 25,
            page: 1,
            query: {
                categories: ["Economics & Finance"],
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
                isLoading: false
            })
        } catch (error) {
            Logger.error(error)
            this.setState({ isLoading: false })
        }
    }

    public render() {
        return (
            <Route
                title={meta.title}
                description={meta.description}
                className={styles.home}
                wide
            >
                <Form onSubmit={this.searchAssets} minimal>
                    <Input
                        type="search"
                        name="search"
                        label="Search for data sets"
                        placeholder="e.g. shapes of plants"
                        value={this.state.search}
                        onChange={this.inputChange}
                        group={
                            <Button primary disabled={!this.state.search}>
                                Search
                            </Button>
                        }
                    />
                </Form>
                <div>
                    <h4>AI for Good</h4>
                    <div>
                        {
                            this.state.isLoading ? (
                                <Spinner message="Loading..." />
                            ) : this.state.categoryAssets && this.state.categoryAssets.length ? (
                                <div className={styles.results}>
                                    {this.state.categoryAssets.map((asset: any) => (
                                        <Asset key={asset.id} asset={asset} />
                                    ))}
                                </div>
                            ) : (
                                <div>No data sets found.</div>
                            )
                        }
                    </div>
                    <h4>Explore Categories</h4>
                    <div className={styles.categories}>
                        {categories.map((category: string) => (
                            <div key={category}>
                                <CategoryImage category={category}/>
                                {category}
                            </div>
                        ))}
                    </div>
                </div>
            </Route>
        )
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
}

Home.contextType = User
export default Home
