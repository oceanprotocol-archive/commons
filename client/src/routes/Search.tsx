import queryString from 'query-string'
import React, { Component } from 'react'
import Route from '../components/templates/Route'
import { User } from '../context/User'
import Asset from '../components/molecules/Asset'
import styles from './Search.module.scss'
import { Logger } from '@oceanprotocol/squid'

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
        const assets = await this.context.ocean.assets.search(searchParams.q)
        this.setState({ results: assets })
    }

    public renderResults = () =>
        this.state.results.length ? (
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
