import React, { PureComponent } from 'react'
import Web3message from '../../components/Web3message'
import Spinner from '../../components/atoms/Spinner'

interface StepRegisterContentProps {
    tryAgain: any
    toStart: any
    state: any
}

export default class StepRegisterContent extends PureComponent<
    StepRegisterContentProps,
    {}
> {
    public publishingState = () => (
        <Spinner message={'Please sign with your crypto wallet'} />
    )

    public errorState = () => (
        <div>
            Something went wrong,{' '}
            <a onClick={() => this.props.tryAgain()}>try again</a>
        </div>
    )

    public publishedState = () => (
        <p>
            Your asset is published! See it{' '}
            <a href={'/asset/' + this.props.state.publishedDid}>here</a>, submit
            another asset by clicking{' '}
            <a onClick={() => this.props.toStart()}>here</a>
        </p>
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
                    <div>Hello</div>
                )}
            </>
        )
    }
}
