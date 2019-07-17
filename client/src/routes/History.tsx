import React, { Component } from 'react'
import Route from '../components/templates/Route'
import AssetsUser from '../components/organisms/AssetsUser'
import Web3message from '../components/organisms/Web3message'
import { User } from '../context'
import Content from '../components/atoms/Content'
import withTracker from '../hoc/withTracker'

class History extends Component {
    public static contextType = User

    public render() {
        return (
            <Route title="History">
                <Content>
                    {!this.context.isLogged && <Web3message />}
                    <AssetsUser list />
                </Content>
            </Route>
        )
    }
}

export default withTracker(History)
