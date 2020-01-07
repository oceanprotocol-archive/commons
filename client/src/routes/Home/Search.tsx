import React, { ChangeEvent, FormEvent, PureComponent } from 'react'
import Button from '../../components/atoms/Button'
import Form from '../../components/atoms/Form/Form'
import Input from '../../components/atoms/Form/Input'
import SearchResults from './SearchResults'
import { Market } from '../../context'

interface SearchProps {
    searchAssets: any
}

interface SearchState {
    search: string,
    results: any
}

export default class Search extends PureComponent<SearchProps, SearchState> {
    public static contextType = Market

    public state = {
        search: '',
        results: []
    }

    private inputChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            search: event.target.value,
            results: []
        })
        if(event.target.value.length >= 5) {
            this.searchAssets(event.target.value)
        }
    }

    cleanupSearch = () => {
        this.setState({search: '', results: []})
    }

    private searchAssets = async (searchTerm: string) => {
        const { ocean, aquarius } = this.context

        const queryValues = { text: [searchTerm] }

        const searchQuery = {
            offset: 5,
            page: 1,
            query: {
                ...queryValues
            },
            sort: {
                created: -1
            }
        }

        try {
            const search = ocean ?
                await ocean.assets.query(searchQuery)
                :await aquarius.queryMetadata(searchQuery)
            this.setState({
                results: search.results
            })
        } catch (error) {
            this.setState({ results: [] })
        }
    }

    public render() {
        const { search, results } = this.state

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
                    placeholder="e.g. mobility, land cover classification, market analysis, etc"
                    value={search}
                    onChange={this.inputChange}
                    group={
                        <Button primary disabled={!search}>
                            Search
                        </Button>
                    }
                />
                {results && (<SearchResults results={results} cleanupSearch={() => {this.cleanupSearch()}}/>)}
            </Form>
        )
    }
}
