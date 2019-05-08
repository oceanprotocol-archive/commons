import React, { useEffect } from 'react'
import ReactGA, { FieldsObject } from 'react-ga'
import { RouteComponentProps } from 'react-router-dom'
import { analyticsId } from '../config'

const withTracker = <P extends RouteComponentProps>(
    WrappedComponent: any,
    options: FieldsObject = {}
) => {
    ReactGA.initialize(analyticsId, {
        testMode: process.env.NODE_ENV === 'test',
        debug: false
    })

    const trackPage = (page: string) => {
        options.isWeb3 = window.web3 !== undefined

        ReactGA.set({ page, ...options })
        ReactGA.pageview(page)
    }

    const HOC = (props: P) => {
        useEffect(() => trackPage(props.location.pathname), [
            props.location.pathname
        ])

        return <WrappedComponent {...props} />
    }

    return HOC
}

export default withTracker
