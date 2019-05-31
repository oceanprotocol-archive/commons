import React, { PureComponent } from 'react'
import Web3message from '../../components/organisms/Web3message'
import Spinner from '../../components/atoms/Spinner'
import Button from '../../components/atoms/Button'
import styles from './StepRegisterContent.module.scss'

export const messages: any = {
    0: '1/4<br />Encrypting files...',
    1: '1/4<br />Successfully encrypted files.',
    2: '2/4<br />Generating proof...',
    3: '2/4<br />Successfully generated proof.',
    4: '3/4<br /> Registering DID...',
    5: '3/4<br /> Successfully registered DID.',
    6: '4/4<br /> Storing DDO...',
    7: '4/4<br /> Successfully stored DDO.'
}

interface StepRegisterContentProps {
    tryAgain(): void
    toStart(): void
    state: {
        publishedDid: string
        isPublishing: boolean
        publishingError: string
        isPublished: boolean
        publishingStep: number
    }
    content?: string
}

export default class StepRegisterContent extends PureComponent<
    StepRegisterContentProps,
    {}
> {
    public publishingState = () => {
        const { publishingStep } = this.props.state

        const message = messages[publishingStep]

        return <Spinner message={message} />
    }

    public errorState = () => (
        <div className={styles.message}>
            Something went wrong,{' '}
            <Button link onClick={() => this.props.tryAgain()}>
                try again
            </Button>
        </div>
    )

    public publishedState = () => (
        <div className={styles.success}>
            <p>Your asset is published!</p>
            <Button link to={'/asset/' + this.props.state.publishedDid}>
                See published asset
            </Button>
            <Button link onClick={() => this.props.toStart()}>
                Publish another asset
            </Button>
        </div>
    )

    public render() {
        return (
            <>
                <Web3message />
                {this.props.state.isPublishing ? (
                    this.publishingState()
                ) : this.props.state.publishingError ? (
                    this.errorState()
                ) : this.props.state.isPublished ? (
                    this.publishedState()
                ) : (
                    <p>{this.props.content}</p>
                )}
            </>
        )
    }
}
