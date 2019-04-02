import React, { Component } from 'react'
import queryString from 'query-string'
import Spinner from '../components/atoms/Spinner'
import Route from '../components/templates/Route'
import { User } from '../context/User'
import Asset from '../components/molecules/Asset'
import styles from './Search.module.scss'

interface SearchState {
    results: any[]
    isLoading: boolean
}

interface SearchProps {
    location: any
    history: any
}

export default class Search extends Component<SearchProps, SearchState> {
    public state = { results: [], isLoading: true }

    public async componentDidMount() {
        const searchParams = queryString.parse(this.props.location.search)
        const assets = await this.context.ocean.assets.search(searchParams.text)
        this.setState({ results: assets, isLoading: false })
    }

    public renderResults = () =>
        this.state.isLoading ? (
            <Spinner message="Searching..." />
        ) : this.state.results.length ? (
            <div className={styles.results}>
                {this.state.results.map((asset: any) => (
                    <Asset key={asset.id} asset={asset} />
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
