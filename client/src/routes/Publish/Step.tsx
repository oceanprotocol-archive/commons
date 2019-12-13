import React, { PureComponent, FormEvent, ChangeEvent } from 'react'
import { MetaData } from '@oceanprotocol/squid'
import Input from '../../components/atoms/Form/Input'
import Label from '../../components/atoms/Form/Label'
import Row from '../../components/atoms/Form/Row'
import Button from '../../components/atoms/Button'
import { User, Market } from '../../context'
import Files from './Files/'
import StepRegisterContent from './StepRegisterContent'
import styles from './Step.module.scss'
import Web3message from '../../components/organisms/Web3message'
import AssetTeaser from '../../components/molecules/AssetTeaser'

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
    handleAddition?(tag: any): void
    handleDelete?(i: number): void
    getAssetSchema(): {
        attributes: MetaData
    }
    renderPricingMechanismSettings(): any 
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
            // return (
            //     <Button
            //         disabled={
            //             !state.validationStatus[currentStep].allFieldsValid
            //         }
            //         onClick={next}
            //     >
            //         Next →
            //     </Button>
            // )
            return (
                <Button
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
            content,
            handleAddition,
            handleDelete,
            getAssetSchema,
            renderPricingMechanismSettings
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
                        if (key === 'links') {
                            return (
                                <Row key={key}>
                                    <Label htmlFor={key} required>
                                        {value.label}
                                    </Label>
                                    <Files
                                        placeholder={value.placeholder}
                                        name={key}
                                        help={value.help}
                                        files={state.links}
                                        onChange={inputChange}
                                    />
                                </Row>
                            )
                        }

                        if (key === 'tags') {
                            return (
                                <Input
                                    key={key}
                                    name={key}
                                    label={value.label}
                                    placeholder={value.placeholder}
                                    required={value.required}
                                    type={value.type}
                                    help={value.help}
                                    handleAddition={handleAddition}
                                    handleDelete={handleDelete}
                                    tags={(state as any)[key]}
                                    suggestions={(state as any)['tagSuggestions']}
                                />
                            )
                        }

                        if (key === 'price') {
                            return (
                                <>
                                {state['pricingMechanism'] != 'Bonding Curve' && (
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
                                        disabled={(state as any)['pricingMechanism'] === 'Royalty Free'}
                                    />
                                )}
                                </>
                            )

                        }

                        return (
                            <>
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
                                {key === 'pricingMechanism' && (
                                    renderPricingMechanismSettings()
                                )}
                            </>
                        )
                    })}

                {lastStep && (
                    <>
                        <StepRegisterContent
                            tryAgain={tryAgain}
                            toStart={toStart}
                            state={state}
                            content={content}
                            web3Enabled={this.context.isLogged}
                        />
                        <AssetTeaser asset={getAssetSchema()} readOnly />
                    </>
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
                    {!lastStep && !this.context.isLogged && <Web3message />}
                </div>
            </>
        )
    }
}
