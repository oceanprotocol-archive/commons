import React, { PureComponent } from 'react'
import { FaucetResponse } from '../ocean'
import Route from '../components/templates/Route'
import Button from '../components/atoms/Button'
import Spinner from '../components/atoms/Spinner'
import { User, Market } from '../context'
import Web3message from '../components/organisms/Web3message'
import styles from './Faucet.module.scss'
import Content from '../components/atoms/Content'
import withTracker from '../hoc/withTracker'
import { showRequestTokens } from '../config'

interface FaucetState {
    isLoading: boolean
    success?: string
    error?: string
    trxHash?: string
}

class Faucet extends PureComponent<{}, FaucetState> {
    public static contextType = User

    public state = {
        isLoading: false,
        success: undefined,
        error: undefined,
        trxHash: undefined
    }

    private getTokens = async () => {
        const { ocean } = this.context
        const accounts = await ocean.accounts.list()
        const account = accounts[0]
        await ocean.accounts.requestTokens(account, 100)
    }

    private getEther = async (
        requestFromFaucet: () => Promise<FaucetResponse>
    ) => {
        this.setState({ isLoading: true })

        try {
            const response = await requestFromFaucet()

            if (!response.success) {
                this.setState({
                    isLoading: false,
                    error: response.message
                })
                return
            }

            const { trxHash } = response

            this.setState({
                isLoading: false,
                success: response.message,
                trxHash
            })
        } catch (error) {
            this.setState({ isLoading: false, error: error.message })
        }
    }

    private reset = () => {
        this.setState({
            error: undefined,
            success: undefined,
            isLoading: false
        })
    }

    private Success = () => {
        const { network } = this.context
        const { trxHash } = this.state

        const submarineLink = `https://submarine.${
            network === 'pacific' ? 'oceanprotocol' : `${network}.dev-ocean`
        }.com/tx/${trxHash}`

        return (
            <div className={styles.success}>
                <strong>{this.state.success}</strong>
                <p>
                    <strong>Your Transaction Hash</strong>

                    <a href={submarineLink}>
                        <code>{trxHash}</code>
                    </a>
                </p>
            </div>
        )
    }

    private Error = () => (
        <div className={styles.error}>
            <p>{this.state.error}</p>
            <Button onClick={() => this.reset()}>Try again</Button>
        </div>
    )

    private GetEther = () => (
        <>
            <Button
                primary
                onClick={() => this.getEther(this.context.requestFromFaucet)}
                disabled={!this.context.isLogged}
                name="FaucetEther"
            >
                Request Ether
            </Button>
            <p>
                You can only request Ether once every 24 hours for your address.
            </p>
        </>
    )

    private GetTokens = () => (
        <>
            <Button
                primary
                onClick={() => this.getTokens()}
                disabled={!this.context.isLogged}
                name="FaucetTokens"
            >
                Request OCEAN Tokens
            </Button>
            <p>You can request tokens every once in a while.</p>
        </>
    )

    public render() {
        const { isLogged } = this.context
        const { isLoading, error, success } = this.state

        return (
            <Market.Consumer>
                {market => (
                    <Route
                        title="Faucet"
                        description={`Shower yourself with some Ether for Ocean's ${market.network} network.`}
                    >
                        <Content>
                            <Web3message />

                            <div className={styles.action}>
                                {isLoading ? (
                                    <Spinner message="Getting Ether..." />
                                ) : error ? (
                                    <this.Error />
                                ) : success ? (
                                    <this.Success />
                                ) : (
                                    <>
                                        {isLogged && <this.GetEther />}
                                        {isLogged && showRequestTokens && (
                                            <this.GetTokens />
                                        )}
                                    </>
                                )}
                            </div>
                        </Content>
                    </Route>
                )}
            </Market.Consumer>
        )
    }
}

export default withTracker(Faucet)
