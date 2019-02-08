import queryString from 'query-string'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Page from '../templates/Page'
import { provideOcean } from '../ocean'

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
        // temporary ocean init and asset retrieval
        const { ocean } = await provideOcean()
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
        const assets = await ocean.searchAssets(queryRequest)
        this.setState({ results: assets })
    }

    private renderAssetBox = (asset: any) => {
        const { metadata } = asset.findServiceByType('Metadata')
        return (
            <Link key={asset.id} to={`/asset/${asset.id}`}>
                <div>{asset.id}</div>
                <div>{metadata.base.name}</div>
                <div>{metadata.base.description}</div>
            </Link>
        )
    }

    public render() {
        return (
            <Page title="Search Results" wide>
                {this.state.results.length ? (
                    this.state.results.map(asset => this.renderAssetBox(asset))
                ) : (
                    <div>No data sets yet</div>
                )}
            </Page>
        )
    }
}
