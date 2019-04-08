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
                success: `Successfully added ETH to your account.`
            })
        } catch (error) {
            this.setState({ isLoading: false, error })
        }
    }

    private RequestMarkup = () => (
        <User.Consumer>
            {states =>
                states.isLogged ? (
                    <Button
                        primary
                        onClick={() => this.getTokens(states.requestFromFaucet)}
                    >
                        Request Ether
                    </Button>
                ) : states.isWeb3 ? (
                    <Web3message />
                ) : (
                    <Web3message />
                )
            }
        </User.Consumer>
    )

    private ActionMarkup = () => (
        <div className={styles.action}>
            {this.state.isLoading ? (
                <Spinner message="Getting Ether..." />
            ) : this.state.error ? (
                <div className={styles.error}>
                    <p>{this.state.error}</p>
                    <Button onClick={this.reset}>Try again</Button>
                </div>
            ) : this.state.success ? (
                <div className={styles.success}>{this.state.success}</div>
            ) : (
                <this.RequestMarkup />
            )}

            <p>
                You can only request Ether once every 24 hours for your address.
            </p>
        </div>
    )

    private reset = () => {
        this.setState({
            error: undefined,
            success: undefined,
            isLoading: false
        })
    }

    public render() {
        return (
            <Route
                title="Faucet"
                description="Shower yourself with some Ether for the Ocean POA network."
            >
                <User.Consumer>
                    {states => !states.isNile && <Web3message />}
                </User.Consumer>

                <this.ActionMarkup />
            </Route>
        )
    }
}
