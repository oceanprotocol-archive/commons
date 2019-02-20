import React, { ChangeEvent, Component, FormEvent } from 'react'
import { Logger } from '@oceanprotocol/squid'
import Route from '../../components/templates/Route'
import Form from '../../components/atoms/Form/Form'
import AssetModel from '../../models/AssetModel'
import Step from './Step'
import Progress from './Progress'

import form from '../../data/form-publish.json'

type AssetType = 'dataset' | 'algorithm' | 'container' | 'workflow' | 'other'

interface PublishState {
    name?: string
    dateCreated?: Date
    description?: string
    files?: string[]
    price?: number
    author?: string
    type?: AssetType
    license?: string
    copyrightHolder?: string
    categories?: string[]
    tags?: string[]
    isPublishing?: boolean
    isPublished?: boolean
    publishedDid?: string
    publishingError?: string
    currentStep?: number
}

class Publish extends Component<{}, PublishState> {
    public state = {
        currentStep: 1,
        name: '',
        dateCreated: new Date(),
        description: '',
        files: [],
        price: 0,
        author: '',
        type: 'dataset' as AssetType,
        license: '',
        copyrightHolder: '',
        categories: [],
        isPublishing: false,
        isPublished: false,
        publishedDid: '',
        publishingError: ''
    }

    private inputChange = (
        event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
    ) => {
        this.setState({
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    private inputToArrayChange = (
        event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
    ) => {
        this.setState({
            [event.currentTarget.name]: [event.currentTarget.value]
        })
    }

    private next = () => {
        let { currentStep } = this.state
        const totalSteps = form.steps.length

        currentStep =
            currentStep >= totalSteps - 1 ? totalSteps : currentStep + 1
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
            dateCreated: new Date(),
            description: '',
            files: [],
            price: 0,
            author: '',
            type: 'dataset' as AssetType,
            license: '',
            copyrightHolder: '',
            categories: [],
            isPublishing: false,
            isPublished: false
        })
    }

    private registerAsset = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        this.setState({
            publishingError: '',
            isPublishing: true
        })
        const account = await this.context.ocean.getAccounts()
        const newAsset = {
            // OEP-08 Attributes
            // https://github.com/oceanprotocol/OEPs/tree/master/8
            base: Object.assign(AssetModel.base, {
                name: this.state.name,
                description: this.state.description,
                dateCreated: new Date().toString(),
                author: this.state.author,
                license: this.state.license,
                copyrightHolder: this.state.copyrightHolder,
                files: this.state.files,
                price: this.state.price,
                type: this.state.type,
                categories: [this.state.categories],
                size: '',
                encoding: '',
                compression: undefined,
                contentType: '',
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
            const asset = await this.context.ocean.registerAsset(
                newAsset,
                account[0]
            )
            this.setState({
                publishedDid: asset.id,
                isPublished: true
            })
        } catch (e) {
            // make readable errors
            Logger.log('error:', e)
            this.setState({
                publishingError: e
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
                <Progress
                    steps={form.steps}
                    currentStep={this.state.currentStep}
                />

                <Form onSubmit={this.registerAsset}>
                    {form.steps.map((step: any, index: number) => (
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
                            totalSteps={form.steps.length}
                            tryAgain={this.tryAgain}
                            toStart={this.toStart}
                        />
                    ))}
                </Form>
            </Route>
        )
    }
}

export default Publish
