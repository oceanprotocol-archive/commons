import React, { PureComponent } from 'react'
import Button from '../../atoms/Button'
import { User } from '../../../context/User'

interface FaucetState {
    isLoading: boolean
    error?: string
}

export default class Faucet extends PureComponent<{}, FaucetState> {
    public state = {
        isLoading: false,
        error: undefined
    }

    private getTokens = async (requestFromFaucet: any) => {
        this.setState({ isLoading: true })

        try {
            await requestFromFaucet()
            this.setState({ isLoading: false })
        } catch (error) {
            this.setState({ isLoading: false, error })
        }
    }

    public render() {
        return (
            <User.Consumer>
                {states =>
                    this.state.isLoading ? (
                        'Getting tokens...'
                    ) : this.state.error ? (
                        this.state.error
                    ) : (
                        <Button
                            link
                            onClick={() =>
                                this.getTokens(states.requestFromFaucet)
                            }
                        >
                            Make it rain
                        </Button>
                    )
                }
            </User.Consumer>
        )
    }
}
