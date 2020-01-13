import React, { ChangeEvent, FormEvent, PureComponent } from 'react'
import Form from '../../components/atoms/Form/Form'
import SearchResults from './SearchResults'
import { History } from 'history'
import { Market } from '../../context'

import styles from './FixedSearch.module.scss'

interface FixedSearchProps {
    searchAssets: any,
    history?: History
}

interface FixedSearchState {
    search: string,
    results: any,
    showSearch: boolean
}

export default class FixedSearch extends PureComponent<FixedSearchProps, FixedSearchState> {
    public static contextType = Market

    public state = {
        search: '',
        results: [],
        showSearch: false
    }

    private searchToggle = () => {
        this.setState({showSearch: !this.state.showSearch})
    }

    private toggleAndSearch = () => {
        if(this.state.showSearch) {
            if(this.props.history){
                this.props.history.push(`/search?text=${this.state.search}`)
            }
            this.setState({ showSearch: false })
        } else  {
            this.setState({ showSearch: true })
        }
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
            console.log(search.results)
        } catch (error) {
            console.log(error)
            this.setState({ results: [] })
        }
    }

    public render() {
        const { search, showSearch, results } = this.state

        return (
            <Form
                onSubmit={(e: FormEvent<HTMLFormElement>) =>
                    this.props.searchAssets(search, e)
                }
                minimal
            >
                <div className={!showSearch ? styles.searchWrapper : styles.searchWrapper + ' ' + styles.active}>
                    <div className={styles.inputHolder}>
                        <input className={styles.searchInput} name="search" type="text" value={search} placeholder="e.g. mobility, land cover classification, market analysis, etc" onChange={this.inputChange}/>
                        <a className={styles.searchIcon} onClick={() => this.toggleAndSearch()} ><span></span></a>
                    </div>
                    <span className={styles.close} onClick={() => this.searchToggle()}></span>
                </div>
                {results && (<SearchResults results={results} cleanupSearch={() => {this.cleanupSearch()}} fixed={true}/>)}
            </Form>
        )
    }
}
