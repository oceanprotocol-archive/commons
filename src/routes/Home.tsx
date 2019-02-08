import React, { ChangeEvent, Component, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/atoms/Button'
import Form from '../components/atoms/Form/Form'
import Input from '../components/atoms/Form/Input'
import Route from '../components/templates/Route'
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
                <Form onSubmit={this.searchAssets}>
                    <Input
                        type="search"
                        name="search"
                        label="Search"
                        placeholder="i.e. almond sales data"
                        value={this.state.search}
                        onChange={this.inputChange}
                        group={<Button>Search</Button>}
                    />
                </Form>

                <div className={styles.published}>
                    <h2 className={styles.subTitle}>Your Data Sets</h2>

                    <div>
                        <p>None yet.</p>
                        <Link to="/publish">+ Publish A Data Set</Link>
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
        this.props.history.push(`/search?q=${this.state.search}`)
    }
}

export default Home
