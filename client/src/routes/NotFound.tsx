import React, { Component } from 'react'
import Route from '../components/templates/Route'
import Content from '../components/atoms/Content'

class NotFound extends Component {
    public render() {
        return (
            <Route title="404 - Not Found">
                <Content>Not Found</Content>
            </Route>
        )
    }
}

export default NotFound
