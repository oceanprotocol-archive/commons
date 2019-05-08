import React, { ChangeEvent, Component, FormEvent } from 'react'
import { Logger } from '@oceanprotocol/squid'
import Route from '../../components/templates/Route'
import Form from '../../components/atoms/Form/Form'
import AssetModel from '../../models/AssetModel'
import { User } from '../../context'
import Web3message from '../../components/organisms/Web3message'
import Step from './Step'
import Progress from './Progress'
import ReactGA from 'react-ga'
import dataPublishForm from '../../data/form-publish.json'

interface LoaderState {
    currentStep?: number
    isPublishing?: boolean
    isPublished?: boolean
    publishedDid?: string
    publishingError?: string
    validationStatus?: any
    [defaultsState: string]: any
}

interface LoaderProps {
    loadType: string
    toSelect: any
}

class Loader extends Component<LoaderProps, LoaderState> {
    public state = {
        currentStep: 1,
        isPublishing: false,
        isPublished: false,
        publishedDid: '',
        publishingError: '',
        validationStatus: (dataPublishForm as any)[this.props.loadType]
            .validation,
        ...(dataPublishForm as any)[this.props.loadType].defaults
    }

    private inputChange = (
        event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
    ) => {
        this.validateInputs(event.currentTarget.name, event.currentTarget.value)

        this.setState({
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    private inputToArrayChange = (
        event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
    ) => {
        this.validateInputs(event.currentTarget.name, event.currentTarget.value)

        this.setState({
            [event.currentTarget.name]: [event.currentTarget.value]
        })
    }

    private next = () => {
        let { currentStep } = this.state
        const totalSteps = (dataPublishForm as any)[this.props.loadType].steps
            .length

        currentStep =
            currentStep >= totalSteps - 1 ? totalSteps : currentStep + 1

        ReactGA.event({
            category: 'Publish',
            action: 'nextStep ' + currentStep
        })

        this.setState({ currentStep })
    }

    private prev = () => {
        let { currentStep } = this.state
        currentStep = currentStep <= 1 ? this.props.toSelect() : currentStep - 1
        this.setState({ currentStep })
    }

    private tryAgain = () => {
        this.setState({ publishingError: '' })
    }

    private toStart = () => {
        this.setState({
            isPublishing: false,
            isPublished: false,
            currentStep: 1,
            ...(dataPublishForm as any)[this.props.loadType].defaults
        })
    }

    private validateInputs = (name: string, value: string) => {
        let hasContent = value && value.length > 0

        // Setting state for all fields
        if (hasContent) {
            this.setState(
                prevState => ({
                    validationStatus: {
                        ...prevState.validationStatus,
                        [this.state.currentStep]: {
                            ...prevState.validationStatus[
                                this.state.currentStep
                            ],
                            [name]: true
                        }
                    }
                }),
                this.runValidation
            )
        } else {
            this.setState(
                prevState => ({
                    validationStatus: {
                        ...prevState.validationStatus,
                        [this.state.currentStep]: {
                            ...prevState.validationStatus[
                                this.state.currentStep
                            ],
                            [name]: false
                        }
                    }
                }),
                this.runValidation
            )
        }
    }

    private runValidation = () => {
        let { validationStatus } = this.state
        for (let step of Object.keys(validationStatus)) {
            const { allFieldsValid, ...keysToCheck } = validationStatus[step]
            if (Object.values(keysToCheck).every(item => item === true)) {
                this.setState(prevState => ({
                    validationStatus: {
                        ...prevState.validationStatus,
                        [step]: {
                            ...prevState.validationStatus[step],
                            allFieldsValid: true
                        }
                    }
                }))
            } else {
                this.setState(prevState => ({
                    validationStatus: {
                        ...prevState.validationStatus,
                        [step]: {
                            ...prevState.validationStatus[step],
                            allFieldsValid: false
                        }
                    }
                }))
            }
        }
    }

    private submitAction = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        ReactGA.event({
            category: 'Publish',
            action: 'registerAsset-start'
        })
        this.setState({
            publishingError: '',
            isPublishing: true
        })
        const { ocean } = this.context
        const account = await ocean.accounts.list()
        const newAsset = {
            // OEP-08 Attributes
            // https://github.com/oceanprotocol/OEPs/tree/master/8
            base: Object.assign(AssetModel.base, {
                name: this.state.name,
                description: this.state.description,
                dateCreated: new Date(this.state.dateCreated).toISOString(),
                author: this.state.author,
                license: this.state.license,
                copyrightHolder: this.state.copyrightHolder,
                files: this.state.files,
                price: this.state.price,
                type: this.state.type,
                categories: [this.state.categories],
                workExample: undefined,
                inLanguage: undefined,
                tags: ''
            }),
            curation: Object.assign(AssetModel.curation),
            additionalInformation: Object.assign(
                AssetModel.additionalInformation
            )
        }

        try {
            const asset = await this.context.ocean.assets.create(
                newAsset,
                account[0]
            )
            this.setState({
                publishedDid: asset.id,
                isPublished: true
            })
            ReactGA.event({
                category: 'Publish',
                action: 'registerAsset-end' + asset.id
            })
        } catch (e) {
            // make readable errors
            Logger.log('error:', e)
            this.setState({
                publishingError: e.message
            })
            ReactGA.event({
                category: 'Publish',
                action: 'registerAsset-error' + e.message
            })
        }
        this.setState({
            isPublishing: false
        })
    }

    public render() {
        const loadedType = (dataPublishForm as any)[this.props.loadType]
        return (
            <Route
                title="Publish"
                description="Publish a new data set into the Ocean Protocol Network."
            >
                {(!this.context.isLogged || !this.context.isNile) && (
                    <Web3message />
                )}

                <Progress
                    steps={loadedType.steps}
                    currentStep={this.state.currentStep}
                />

                <Form onSubmit={this.submitAction}>
                    {loadedType.steps.map(
                        (step: any, index: number) => (
                            <Step
                                key={index}
                                index={index}
                                title={step.title}
                                description={step.description}
                                currentStep={this.state.currentStep}
                                fields={step.fields}
                                inputChange={this.inputChange}
                                inputToArrayChange={this.inputToArrayChange}
                                state={this.state}
                                next={this.next}
                                prev={this.prev}
                                totalSteps={
                                    (dataPublishForm as any)[
                                        this.props.loadType
                                    ].steps.length
                                }
                                tryAgain={this.tryAgain}
                                toStart={this.toStart}
                                content={step.content}
                            />
                        )
                    )}
                </Form>
            </Route>
        )
    }
}

Loader.contextType = User
export default Loader
