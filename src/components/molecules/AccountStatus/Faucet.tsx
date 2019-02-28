import React, { PureComponent } from 'react'
import Button from '../../atoms/Button'
import { User } from '../../../context/User'

interface FaucetProps {
    togglePopover: any
}

interface FaucetState {
    isLoading: boolean
    success?: string
    error?: string
}

export default class Faucet extends PureComponent<FaucetProps, FaucetState> {
    public state = {
        isLoading: false,
        success: undefined,
        error: undefined
    }

    private getTokens = async (requestFromFaucet: any) => {
        // prevent popup from closing on click
        this.props.togglePopover()

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
                            link
                            onClick={() =>
                                this.getTokens(states.requestFromFaucet)
                            }
                        >
                            Request Ether
                        </Button>
                    )
                }
            </User.Consumer>
        )
    }
}
