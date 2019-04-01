import React, { Component } from 'react'
import Route from '../components/templates/Route'
import AssetsUser from '../components/organisms/AssetsUser'

export default class History extends Component {
    public render() {
        return (
            <Route title="History">
                <AssetsUser list />
            </Route>
        )
    }
}
