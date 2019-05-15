import React, { ChangeEvent, Component, FormEvent } from 'react'
import { User } from '../context'
import { Logger } from '@oceanprotocol/squid'
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
                    {this.state.categoryAssets.map((asset: any) => (
                        <div key={asset.id}>{asset.id}</div>
                    ))}
                </div>
                category lists
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
