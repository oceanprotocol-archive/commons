import React, { ChangeEvent, Component, FormEvent } from 'react'
import Button from '../components/atoms/Button'
import Form from '../components/atoms/Form/Form'
import Input from '../components/atoms/Form/Input'
import Route from '../components/templates/Route'
import styles from './Home.module.scss'

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
                title="Commons"
                description="A marketplace to find and publish open data sets in the Ocean Network."
                className={styles.home}
            >
                <Form onSubmit={this.searchAssets}>
                    <Input
                        type="search"
                        name="search"
                        label="Search"
                        placeholder=""
                        value={this.state.search}
                        onChange={this.inputChange}
                        group={<Button>Search</Button>}
                    />
                </Form>
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
