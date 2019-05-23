import React, { ChangeEvent, Component, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { User, Market } from '../context'
import CategoryImage from '../components/atoms/CategoryImage'
import Button from '../components/atoms/Button'
import Form from '../components/atoms/Form/Form'
import Input from '../components/atoms/Form/Input'
import Route from '../components/templates/Route'
import styles from './Home.module.scss'

import meta from '../data/meta.json'
import { History } from 'history'
import Content from '../components/atoms/Content'
import AssetsLatest from '../components/organisms/AssetsLatest'
import ChannelTeaser from '../components/organisms/ChannelTeaser'

interface HomeProps {
    history: History
}

interface HomeState {
    search?: string
}

export default class Home extends Component<HomeProps, HomeState> {
    public static contextType = User

    public state = {
        search: ''
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
        const { search } = this.state

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
                    <ChannelTeaser channel="ai-for-good" />
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
