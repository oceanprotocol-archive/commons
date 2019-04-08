import React, { Component } from 'react'
import ReactGA from 'react-ga'

interface TrackerProps {
    location: any
}

ReactGA.initialize('UA-60614729-11', {testMode: process.env.NODE_ENV === 'test'})

export default function withTracker(WrappedComponent: any, options: any = {}) {
    const trackPage = (page: any) => {
        options.isWeb3 = (window.web3 !== undefined)
        ReactGA.set({
            page,
            ...options
        })
        ReactGA.pageview(page)
    }

    const HOC = class extends Component<TrackerProps, {}> {
        componentDidMount() {
            const page = this.props.location.pathname + this.props.location.search
            trackPage(page)
        }

        componentWillReceiveProps(nextProps: any) {
            const currentPage = this.props.location.pathname;
            const nextPage = nextProps.location.pathname;
      
            if (currentPage !== nextPage) {
                trackPage(nextProps.location.pathname + nextProps.location.search);
            }
        }

        render() {
            return <WrappedComponent {...this.props} />
        }
    }

    return HOC
}