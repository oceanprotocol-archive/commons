import React, { PureComponent } from 'react'
import Route from '../components/templates/Route'
import Button from '../components/atoms/Button'
import Spinner from '../components/atoms/Spinner'
import { User } from '../context/User'
import Web3message from '../components/molecules/Web3message'
import styles from './Faucet.module.scss'

interface FaucetState {
    isLoading: boolean
    success?: string
    error?: string
    eth?: string
}

class Faucet extends PureComponent<{}, FaucetState> {
    public state = {
        isLoading: false,
        success: undefined,
        error: undefined,
        eth: 'xx'
    }

    private getTokens = async (requestFromFaucet: () => void) => {
        this.setState({ isLoading: true })

        try {
            await requestFromFaucet()
            this.setState({
                isLoading: false,
                success: `Successfully added ${
                    this.state.eth
                } ETH to your account.`
            })
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

                <div className={styles.action}>
                    <p>
                        Click the button below to request Ether for the Ocean
                        POA network.
                        <br /> You can only request Ether once every 24 hours
                        for your address.
                    </p>
                    <User.Consumer>
                        {states =>
                            this.state.isLoading ? (
                                <Spinner message="Getting Ether..." />
                            ) : this.state.error ? (
                                this.state.error
                            ) : this.state.success ? (
                                <div className={styles.success}>
                                    {this.state.success}
                                </div>
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
                </div>
            </Route>
        )
    }
}

export default Faucet
