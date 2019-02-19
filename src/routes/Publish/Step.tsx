import React, { PureComponent, FormEvent } from 'react'
import Input from '../../components/atoms/Form/Input'
import Label from '../../components/atoms/Form/Label'
import Row from '../../components/atoms/Form/Row'
import Button from '../../components/atoms/Button'
import { User } from '../../context/User'
import Files from './Files/'
import styles from './Step.module.scss'

interface StepProps {
    currentStep: number
    index: number
    inputChange: any
    inputToArrayChange: any
    fields?: any[]
    files?: any
    state: any
    title: string
    next: any
    prev: any
    totalSteps: number
}

export default class Step extends PureComponent<StepProps, {}> {
    public previousButton() {
        let { currentStep, prev } = this.props

        if (currentStep !== 1) {
            return <Button onClick={prev}>Previous</Button>
        }
        return null
    }

    public nextButton() {
        let { currentStep, next, totalSteps } = this.props

        if (currentStep < totalSteps) {
            return <Button onClick={next}>Next</Button>
        }
        return null
    }

    public render() {
        const {
            currentStep,
            index,
            title,
            fields,
            inputChange,
            inputToArrayChange,
            files,
            state,
            totalSteps
        } = this.props

        if (currentStep !== index + 1) {
            return null
        }

        return (
            <>
                <h3 className={styles.title}>{title}</h3>
                {fields &&
                    Object.entries(fields).map(([key, value]) => {
                        let onChange = inputChange

                        if (key === 'files' || key === 'categories') {
                            onChange = inputToArrayChange
                        }

                        if (key === 'files') {
                            return (
                                <Row key={key}>
                                    <Label htmlFor={key} required>
                                        {value.label}
                                    </Label>
                                    <Files
                                        placeholder={value.placeholder}
                                        name={value.name}
                                        help={value.help}
                                        files={files}
                                        onChange={onChange}
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
                                onChange={onChange}
                                rows={value.rows}
                                value={(state as any)[key]}
                            />
                        )
                    })}

                {this.previousButton()}
                {this.nextButton()}

                {currentStep === totalSteps && (
                    <User.Consumer>
                        {states =>
                            states.isLogged ? (
                                <Button primary>Register asset</Button>
                            ) : (
                                <Button onClick={states.startLogin}>
                                    Register asset (login first)
                                </Button>
                            )
                        }
                    </User.Consumer>
                )}
            </>
        )
    }
}

Step.contextType = User
