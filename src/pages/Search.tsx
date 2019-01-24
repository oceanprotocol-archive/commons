import queryString from 'query-string'
import React, { Component } from 'react'
import { provideOcean } from '../ocean'

interface IState {
    results?: any[]
}

interface IProps {
    location: any,
    history: any
}

class Search extends Component<IProps, IState>  {

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
      this.setState({results:assets})
    }

    public render() {
        return (
            <div>
                kra
            </div>
        )
    }
}

export default Search
