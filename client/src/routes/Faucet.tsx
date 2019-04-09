import React, { PureComponent } from 'react'
import Route from '../components/templates/Route'
import Button from '../components/atoms/Button'
import Spinner from '../components/atoms/Spinner'
import { User } from '../context/User'
import Web3message from '../components/organisms/Web3message'
import styles from './Faucet.module.scss'

interface FaucetState {
    isLoading: boolean
    success?: string
    error?: string
}

export default class Faucet extends PureComponent<{}, FaucetState> {
    public state = {
        isLoading: false,
        success: undefined,
        error: undefined
    }

    private getTokens = async (requestFromFaucet: () => any) => {
        this.setState({ isLoading: true })

        try {
            const response = await requestFromFaucet()

            if (response.error) {
                this.setState({
                    isLoading: false,
                    error: response.error
                })

                return
            }

            this.setState({
                isLoading: false,
                success: 'Successfully added ETH to your account.'
            })
        } catch (error) {
            this.setState({ isLoading: false, error })
        }
    }

    private reset = () => {
        this.setState({
            error: undefined,
            success: undefined,
            isLoading: false
        })
    }

    private Success = () => (
        <div className={styles.success}>{this.state.success}</div>
    )

    private Error = () => (
        <div className={styles.error}>
            <p>{this.state.error}</p>
            <Button onClick={() => this.reset()}>Try again</Button>
        </div>
    )

    private Action = () => (
        <>
            <Button
                primary
                onClick={() => this.getTokens(this.context.requestFromFaucet)}
                disabled={!this.context.isLogged}
            >
                Request Ether
            </Button>
            <p>
                You can only request Ether once every 24 hours for your address.
            </p>
        </>
    )

    public render() {
        const { isWeb3 } = this.context
        const { isLoading, error, success } = this.state

        return (
            <Route
                title="Faucet"
                description="Shower yourself with some Ether for Ocean's Nile test network."
            >
                <Web3message />

                <div className={styles.action}>
                    {isLoading ? (
                        <Spinner message="Getting Ether..." />
                    ) : error ? (
                        <this.Error />
                    ) : success ? (
                        <this.Success />
                    ) : (
                        isWeb3 && <this.Action />
                    )}
                </div>
            </Route>
        )
    }
}

Faucet.contextType = User
