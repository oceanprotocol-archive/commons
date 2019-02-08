import React, { ChangeEvent, Component, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/atoms/Button'
import Form from '../components/atoms/Form/Form'
import Input from '../components/atoms/Form/Input'
import Content from '../components/Content'
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
            <div className={styles.home}>
                <Content>
                    <Link to={'/styleguide'}>Styleguide</Link>

                    <div>
                        <Form onSubmit={this.searchAssets}>
                            <Input
                                type="search"
                                name="search"
                                label="Search"
                                value={this.state.search}
                                onChange={this.inputChange}
                            />
                            <Button>Search</Button>
                        </Form>
                    </div>
                </Content>
            </div>
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
