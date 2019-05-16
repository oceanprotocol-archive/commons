import React, { Component } from 'react'
import Route from '../components/templates/Route'
import AssetsUser from '../components/organisms/AssetsUser'
import Web3message from '../components/organisms/Web3message'
import { User } from '../context'

export default class History extends Component {
    public render() {
        return (
            <Route title="History">
                {(!this.context.isLogged || !this.context.isOceanNetwork) && (
                    <Web3message />
                )}

                <AssetsUser list />
            </Route>
        )
    }
}

History.contextType = User
