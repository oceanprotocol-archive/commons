import React, { PureComponent } from 'react'
import Web3message from '../../components/molecules/Web3message'
import Spinner from '../../components/atoms/Spinner'
import styles from './StepRegisterContent.module.scss'

interface StepRegisterContentProps {
    tryAgain: any
    toStart: any
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
        <div className={styles.message}>
            Your asset is published! See it{' '}
            <a href={'/asset/' + this.props.state.publishedDid}>here</a>, submit
            another asset by clicking{' '}
            <a onClick={() => this.props.toStart()}>here</a>
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
