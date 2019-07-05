import React, { ChangeEvent, Component, FormEvent } from 'react'
import { History } from 'history'
import { User } from '../context'
import Button from '../components/atoms/Button'
import Form from '../components/atoms/Form/Form'
import Input from '../components/atoms/Form/Input'
import Route from '../components/templates/Route'
import styles from './Home.module.scss'

import meta from '../data/meta.json'
import Content from '../components/atoms/Content'

interface HomeProps {
    history: History
}

interface HomeState {
    search?: string
    asset?: string
}

export default class Home extends Component<HomeProps, HomeState> {
    public static contextType = User

    public state = {
        search: '',
        asset: ''
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

    private openAsset = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        this.props.history.push(`/asset/${this.state.asset}`)
    }

    public render() {
        const { search, asset } = this.state

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
                    <Form onSubmit={this.openAsset} minimal>
                        <Input
                            type="search"
                            name="asset"
                            label="Search for data sets"
                            placeholder="e.g. did:op:3640ec34892c4c56bb2e6964746feb0842616c9f85d448808d93b0eabcbcb3e0"
                            value={asset}
                            onChange={this.inputChange}
                            group={
                                <Button primary disabled={!asset}>
                                    Open asset
                                </Button>
                            }
                        />
                    </Form>
                </Content>
            </Route>
        )
    }
}
