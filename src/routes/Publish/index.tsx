import React, { ChangeEvent, Component, FormEvent } from 'react'
import { Logger } from '@oceanprotocol/squid'
import Route from '../../components/templates/Route'
import Button from '../../components/atoms/Button'
import Form from '../../components/atoms/Form/Form'
import Input from '../../components/atoms/Form/Input'
import Label from '../../components/atoms/Form/Label'
import Row from '../../components/atoms/Form/Row'
import { User } from '../../context/User'
import AssetModel from '../../models/AssetModel'
import Web3message from '../../components/Web3message'
import Files from './Files/'

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
}

class Publish extends Component<{}, PublishState> {
    public state = {
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

    public formFields = (entries: any[]) =>
        entries.map(([key, value]) => {
            let onChange = this.inputChange

            if (key === 'files' || key === 'categories') {
                onChange = this.inputToArrayChange
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
                            files={this.state.files}
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
                    value={(this.state as any)[key]}
                />
            )
        })

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

    private tryAgain = () => {
        this.setState({ publishingError: '' })
    }

    private toStart = () => {
        this.setState({
            name: '',
            dateCreated: new Date(),
            description: '',
            files: [''],
            price: 0,
            author: '',
            type: 'dataset' as AssetType,
            license: '',
            copyrightHolder: '',
            categories: [''],
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
                contentUrls: [this.state.files],
                price: this.state.price,
                type: this.state.type,
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
            Logger.log('asset:', asset)
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
        const entries = Object.entries(form.fields)

        return (
            <Route title="Publish">
                <Web3message />

                {this.state.isPublishing ? (
                    this.publishingState()
                ) : this.state.publishingError ? (
                    this.errorState()
                ) : this.state.isPublished ? (
                    this.publishedState()
                ) : (
                    <Form
                        title={form.title}
                        description={form.description}
                        onSubmit={this.registerAsset}
                    >
                        {this.formFields(entries)}

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
                    </Form>
                )}
            </Route>
        )
    }

    public publishingState = () => {
        return <div>Please sign with your crypto wallet</div>
    }

    public errorState = () => {
        return (
            <div>
                Something went wrong,{' '}
                <a onClick={() => this.tryAgain()}>try again</a>
            </div>
        )
    }

    public publishedState = () => {
        return (
            <div>
                Your asset is published! See it{' '}
                <a href={'/asset/' + this.state.publishedDid}>here</a>, submit
                another asset by clicking{' '}
                <a onClick={() => this.toStart()}>here</a>
            </div>
        )
    }
}

Publish.contextType = User
export default Publish
