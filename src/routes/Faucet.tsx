import React, { PureComponent } from 'react'
import Route from '../components/templates/Route'
import Button from '../components/atoms/Button'
import { User } from '../context/User'
import Web3message from '../components/molecules/Web3message'
import styles from './Faucet.module.scss'

interface FaucetState {
    isLoading: boolean
    success?: string
    error?: string
}

class Faucet extends PureComponent<{}, FaucetState> {
    public state = {
        isLoading: false,
        success: undefined,
        error: undefined
    }

    private getTokens = async (requestFromFaucet: () => void) => {
        this.setState({ isLoading: true })

        try {
            await requestFromFaucet()
            this.setState({ isLoading: false, success: 'Tokens added!' })
        } catch (error) {
            this.setState({ isLoading: false, error })
        }
    }

    public render() {
        return (
            <Route
                title="Faucet"
                description="Shower yourself with some Ether."
            >
                <Web3message />

                <User.Consumer>
                    {states =>
                        this.state.isLoading ? (
                            'Getting tokens...'
                        ) : this.state.error ? (
                            this.state.error
                        ) : this.state.success ? (
                            this.state.success
                        ) : (
                            <Button
                                primary
                                onClick={() =>
                                    this.getTokens(states.requestFromFaucet)
                                }
                            >
                                Request Ether
                            </Button>
                        )
                    }
                </User.Consumer>
            </Route>
        )
    }
}

export default Faucet
