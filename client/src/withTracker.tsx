import React, { PureComponent } from 'react'
import ReactGA from 'react-ga'

import { analyticsId } from './config/config'

interface TrackerProps {
    location: Location
}

ReactGA.initialize(analyticsId, {
    testMode: process.env.NODE_ENV === 'test'
})

export default function withTracker(WrappedComponent: any, options: any = {}) {
    const trackPage = (page: string) => {
        options.isWeb3 = window.web3 !== undefined
        ReactGA.set({
            page,
            ...options
        })
        ReactGA.pageview(page)
    }

    return class HOC extends PureComponent<TrackerProps, {}> {
        public componentDidMount() {
            const page =
                this.props.location.pathname + this.props.location.search
            trackPage(page)
        }

        public componentWillReceiveProps(nextProps: any) {
            const currentPage = this.props.location.pathname
            const nextPage = nextProps.location.pathname

            if (currentPage !== nextPage) {
                trackPage(
                    nextProps.location.pathname + nextProps.location.search
                )
            }
        }

        public render() {
            return <WrappedComponent {...this.props} />
        }
    }
}
