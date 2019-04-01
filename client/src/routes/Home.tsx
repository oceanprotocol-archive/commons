import React, { ChangeEvent, Component, FormEvent } from 'react'
import Button from '../components/atoms/Button'
import Form from '../components/atoms/Form/Form'
import Input from '../components/atoms/Form/Input'
import Route from '../components/templates/Route'
import AssetsUser from '../components/organisms/AssetsUser'
import styles from './Home.module.scss'

import meta from '../data/meta.json'

interface HomeState {
    search?: string
}

interface HomeProps {
    history: any
}

class Home extends Component<HomeProps, HomeState> {
    public state = { search: '' }

    public render() {
        return (
            <Route
                title={meta.title}
                description={meta.description}
                className={styles.home}
            >
                <Form onSubmit={this.searchAssets} minimal>
                    <Input
                        type="search"
                        name="search"
                        label="Search for data sets"
                        placeholder="i.e. almond sales data"
                        value={this.state.search}
                        onChange={this.inputChange}
                        group={
                            <Button primary disabled={!this.state.search}>
                                Search
                            </Button>
                        }
                    />
                </Form>
                <AssetsUser recent={5} list />
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
        this.props.history.push(`/search?q=${this.state.search}`)
    }
}

export default Home
