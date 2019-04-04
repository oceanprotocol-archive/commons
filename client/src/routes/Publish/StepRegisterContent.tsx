import React, { PureComponent } from 'react'
import Web3message from '../../components/organisms/Web3message'
import Spinner from '../../components/atoms/Spinner'
import Button from '../../components/atoms/Button'
import styles from './StepRegisterContent.module.scss'

interface StepRegisterContentProps {
    tryAgain(): void
    toStart(): void
    state: any
    content?: string
}

export default class StepRegisterContent extends PureComponent<
    StepRegisterContentProps,
    {}
> {
    public publishingState = () => (
        <Spinner message={'Please sign with your crypto wallet'} />
    )

    public errorState = () => (
        <div className={styles.message}>
            Something went wrong,{' '}
            <a onClick={() => this.props.tryAgain()}>try again</a>
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
