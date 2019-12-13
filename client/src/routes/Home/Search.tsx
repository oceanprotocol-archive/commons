import React, { ChangeEvent, FormEvent, PureComponent } from 'react'
import Button from '../../components/atoms/Button'
import Form from '../../components/atoms/Form/Form'
import Input from '../../components/atoms/Form/Input'

interface SearchProps {
    searchAssets: any
}

interface SearchState {
    search: string
}

export default class Search extends PureComponent<SearchProps, SearchState> {
    public state = {
        search: ''
    }

    private handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            search: event.target.value
        })
    }

    public render() {
        const { search } = this.state

        return (
            <Form
                onSubmit={(e: FormEvent<HTMLFormElement>) =>
                    this.props.searchAssets(search, e)
                }
                minimal
            >
                <Input
                    type="search"
                    name="search"
                    label="Search for data sets"
                    placeholder="e.g. shapes of plants"
                    value={search}
                    onChange={this.handleInputChange}
                    group={
                        <Button primary disabled={!search}>
                            Search
                        </Button>
                    }
                />
            </Form>
        )
    }
}
