import React, { PureComponent, FormEvent, ChangeEvent } from 'react'
import Input from '../../components/atoms/Form/Input'
import Label from '../../components/atoms/Form/Label'
import Row from '../../components/atoms/Form/Row'
import Button from '../../components/atoms/Button'
import { User, Market } from '../../context'
import Files from './Files/'
import StepRegisterContent from './StepRegisterContent'
import styles from './Step.module.scss'
import Web3message from '../../components/organisms/Web3message'

interface Fields {
    label: string
    placeholder?: string
    help?: string
    type: string
    required?: boolean
    options?: string
    rows?: number
}

interface StepProps {
    currentStep: number
    index: number
    inputChange(
        event:
            | FormEvent<HTMLInputElement>
            | ChangeEvent<HTMLInputElement>
            | ChangeEvent<HTMLSelectElement>
            | ChangeEvent<HTMLTextAreaElement>
    ): void
    fields?: Fields
    state: any
    title: string
    description: string
    next(): void
    prev(): void
    totalSteps: number
    tryAgain(): void
    toStart(): void
    publishedDid?: string
    content?: string
}

export default class Step extends PureComponent<StepProps, {}> {
    public static contextType = User

    public previousButton() {
        const { currentStep, prev } = this.props

        if (currentStep !== 1) {
            return (
                <Button link onClick={prev}>
                    ← Previous
                </Button>
            )
        }
        return null
    }

    public nextButton() {
        const { currentStep, next, totalSteps, state } = this.props

        if (currentStep < totalSteps) {
            return (
                <Button
                    disabled={
                        !state.validationStatus[currentStep].allFieldsValid
                    }
                    onClick={next}
                >
                    Next →
                </Button>
            )
        }
        return null
    }

    public render() {
        const {
            currentStep,
            index,
            title,
            description,
            fields,
            inputChange,
            state,
            totalSteps,
            tryAgain,
            toStart,
            content
        } = this.props

        if (currentStep !== index + 1) {
            return null
        }

        const lastStep = currentStep === totalSteps

        return (
            <>
                <header className={styles.header}>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.description}>{description}</p>
                </header>

                {fields &&
                    Object.entries(fields).map(([key, value]) => {
                        if (key === 'files') {
                            return (
                                <Row key={key}>
                                    <Label htmlFor={key} required>
                                        {value.label}
                                    </Label>
                                    <Files
                                        placeholder={value.placeholder}
                                        name={key}
                                        help={value.help}
                                        files={state.files}
                                        onChange={inputChange}
                                    />
                                </Row>
                            )
                        }

                        return (
                            <Input
                                key={key}
                                name={key}
                                label={value.label}
                                placeholder={value.placeholder}
                                required={value.required}
                                type={value.type}
                                help={value.help}
                                options={value.options}
                                onChange={inputChange}
                                rows={value.rows}
                                value={(state as any)[key]}
                            />
                        )
                    })}

                {lastStep && (
                    <StepRegisterContent
                        tryAgain={tryAgain}
                        toStart={toStart}
                        state={state}
                        content={content}
                    />
                )}

                <div className={styles.actions}>
                    {this.previousButton()}
                    {this.nextButton()}

                    {lastStep && (
                        <Market.Consumer>
                            {market => (
                                <Button
                                    disabled={
                                        !this.context.isLogged ||
                                        !market.networkMatch ||
                                        this.props.state.isPublishing
                                    }
                                    primary
                                >
                                    Register asset
                                </Button>
                            )}
                        </Market.Consumer>
                    )}
                </div>
                <div className={styles.account}>
                    {!lastStep && <Web3message />}
                </div>
            </>
        )
    }
}
