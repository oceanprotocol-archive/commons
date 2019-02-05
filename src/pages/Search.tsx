import queryString from 'query-string'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { provideOcean } from '../ocean'

interface IState {
    results: any[]
}

interface IProps {
    location: any
    history: any
}

class Search extends Component<IProps, IState> {
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
        this.setState(state => ({ results: assets }))
    }

    public render() {
        return (
            <>
                {this.state.results.length ? (
                    this.state.results.map(asset => this.renderAssetBox(asset))
                ) : (
                    <div>No data sets yet</div>
                )}
            </>
        )
    }

    private renderAssetBox = (asset: any) => {
        const { metadata } = asset.findServiceByType('Metadata')
        return (
            <div key={asset.id} onClick={this.openDetails.bind(this, asset.id)}>
                <div>{asset.id}</div>
                <div>{metadata.base.name}</div>
                <div>{metadata.base.description}</div>
            </div>
        )
    }

    private openDetails = (assetId: string) => {
        this.props.history.push(`/asset/${assetId}`)
    }
}

export default Search
