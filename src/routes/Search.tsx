import queryString from 'query-string'
import React, { Component } from 'react'
import Route from '../components/templates/Route'
import { User } from '../context/User'
import Asset from '../components/molecules/Asset'
import styles from './Search.module.scss'

interface SearchState {
    results: any[]
}

interface SearchProps {
    location: any
    history: any
}

export default class Search extends Component<SearchProps, SearchState> {
    public state = { results: [] }

    public async componentDidMount() {
        const searchParams = queryString.parse(this.props.location.search)
        const queryRequest: any = {
            offset: 100,
            page: 0,
            query: {
                $text: {
                    $search: searchParams.q
                }
            }
        }
        const assets = await this.context.ocean.searchAssets(queryRequest)
        this.setState({ results: assets })
    }

    public renderResults = () =>
        this.state.results.length ? (
            <div className={styles.results}>
                {this.state.results.map(asset => (
                    <Asset key={asset} asset={asset} />
                ))}
            </div>
        ) : (
            <div>No data sets yet</div>
        )

    public render() {
        return (
            <Route title="Search Results" wide>
                {this.renderResults()}
            </Route>
        )
    }
}

Search.contextType = User
