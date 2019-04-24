import React, { ChangeEvent, Component, FormEvent } from 'react'
import { Logger } from '@oceanprotocol/squid'
import ReactGA from 'react-ga'
import Route from '../../components/templates/Route'
import Form from '../../components/atoms/Form/Form'
import AssetModel from '../../models/AssetModel'
import { User } from '../../context'
import Web3message from '../../components/organisms/Web3message'
import Step from './Step'
import Progress from './Progress'

import { steps } from '../../data/form-publish.json'

type AssetType = 'dataset' | 'algorithm' | 'container' | 'workflow' | 'other'

interface PublishState {
    name?: string
    dateCreated?: string
    description?: string
    files?: string[]
    price?: number
    author?: string
    type?: AssetType
    license?: string
    copyrightHolder?: string
    categories?: string
    tags?: string[]
    isPublishing?: boolean
    isPublished?: boolean
    publishedDid?: string
    publishingError?: string
    currentStep?: number
    validationStatus?: any
}

class Publish extends Component<{}, PublishState> {
    public state = {
        currentStep: 1,
        name: '',
        dateCreated: new Date().toISOString(),
        description: '',
        files: [],
        price: 0,
        author: '',
        type: 'dataset' as AssetType,
        license: '',
        copyrightHolder: '',
        categories: '',
        isPublishing: false,
        isPublished: false,
        publishedDid: '',
        publishingError: '',
        validationStatus: {
            1: { name: false, files: false, allFieldsValid: false },
            2: {
                description: false,
                categories: false,
                allFieldsValid: false
            },
            3: {
                author: false,
                copyrightHolder: false,
                license: false,
                allFieldsValid: false
            }
        }
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
        const totalSteps = steps.length

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
        currentStep = currentStep <= 1 ? 1 : currentStep - 1
        this.setState({ currentStep })
    }

    private tryAgain = () => {
        this.setState({ publishingError: '' })
    }

    private toStart = () => {
        this.setState({
            name: '',
            dateCreated: new Date().toISOString(),
            description: '',
            files: [],
            price: 0,
            author: '',
            type: 'dataset' as AssetType,
            license: '',
            copyrightHolder: '',
            categories: '',
            isPublishing: false,
            isPublished: false,
            currentStep: 1
        })
    }

    private validateInputs = (name: string, value: string) => {
        let hasContent = value.length > 0

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
        //
        // Step 1
        //
        if (validationStatus[1].name && validationStatus[1].files) {
            this.setState(prevState => ({
                validationStatus: {
                    ...prevState.validationStatus,
                    1: {
                        ...prevState.validationStatus[1],
                        allFieldsValid: true
                    }
                }
            }))
        } else {
            this.setState(prevState => ({
                validationStatus: {
                    ...prevState.validationStatus,
                    1: {
                        ...prevState.validationStatus[1],
                        allFieldsValid: false
                    }
                }
            }))
        }

        //
        // Step 2
        //
        if (validationStatus[2].description && validationStatus[2].categories) {
            this.setState(prevState => ({
                validationStatus: {
                    ...prevState.validationStatus,
                    2: {
                        ...prevState.validationStatus[2],
                        allFieldsValid: true
                    }
                }
            }))
        } else {
            this.setState(prevState => ({
                validationStatus: {
                    ...prevState.validationStatus,
                    2: {
                        ...prevState.validationStatus[2],
                        allFieldsValid: false
                    }
                }
            }))
        }

        //
        // Step 3
        //
        if (
            validationStatus[3].author &&
            validationStatus[3].copyrightHolder &&
            validationStatus[3].license
        ) {
            this.setState(prevState => ({
                validationStatus: {
                    ...prevState.validationStatus,
                    3: {
                        ...prevState.validationStatus[3],
                        allFieldsValid: true
                    }
                }
            }))
        } else {
            this.setState(prevState => ({
                validationStatus: {
                    ...prevState.validationStatus,
                    3: {
                        ...prevState.validationStatus[3],
                        allFieldsValid: false
                    }
                }
            }))
        }
    }

    private registerAsset = async (event: FormEvent<HTMLFormElement>) => {
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
        return (
            <Route
                title="Publish"
                description="Publish a new data set into the Ocean Protocol Network."
            >
                {(!this.context.isLogged || !this.context.isOceanNetwork) && (
                    <Web3message />
                )}

                <Progress steps={steps} currentStep={this.state.currentStep} />

                <Form onSubmit={this.registerAsset}>
                    {steps.map((step: any, index: number) => (
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
                            totalSteps={steps.length}
                            tryAgain={this.tryAgain}
                            toStart={this.toStart}
                            content={step.content}
                        />
                    ))}
                </Form>
            </Route>
        )
    }
}

Publish.contextType = User
export default Publish
