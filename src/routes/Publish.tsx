import React, { ChangeEvent, Component, FormEvent } from 'react'
import Route from '../components/templates/Route'
import Button from '../components/atoms/Button'
import Form from '../components/atoms/Form/Form'
import Input from '../components/atoms/Form/Input'
import { User } from '../context/User'
import AssetModel from '../models/AssetModel'

import form from '../data/form-publish.json'

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
}

class Publish extends Component<{}, PublishState> {
    public state = {
        name: '',
        dateCreated: new Date(),
        description: '',
        files: [''],
        price: 0,
        author: '',
        type: 'dataset' as AssetType,
        license: '',
        copyrightHolder: '',
        categories: ['']
    }

    public formFields = (entries: any[]) =>
        entries.map(([key, value]) => {
            let onChange = this.inputChange

            if (key === 'files' || key === 'categories') {
                onChange = this.inputToArrayChange
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
            [event.target.name]: event.target.value
        })
    }

    private inputToArrayChange = (
        event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
    ) => {
        this.setState({
            [event.target.name]: [event.target.value]
        })
    }

    private registerAsset = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
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

        await this.context.ocean.registerAsset(newAsset, account[0])
    }

    public render() {
        const entries = Object.entries(form.fields)

        return (
            <Route title="Publish">
                <Form
                    title={form.title}
                    description={form.description}
                    onSubmit={this.registerAsset}
                >
                    {this.formFields(entries)}

                    <User.Consumer>
                        {states =>
                            states.isLogged ? (
                                <Button primary>
                                    Register asset (we are logged)
                                </Button>
                            ) : (
                                <Button primary onClick={states.startLogin}>
                                    Register asset (login first)
                                </Button>
                            )
                        }
                    </User.Consumer>
                </Form>
            </Route>
        )
    }
}

Publish.contextType = User
export default Publish
