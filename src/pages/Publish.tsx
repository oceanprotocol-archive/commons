import React, { ChangeEvent, Component, FormEvent } from 'react'
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
                    // value={this.state[key]}
                    // value={this.state.files[0]}
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
            <div>
                <h1>Publish</h1>
                <Form
                    title={form.title}
                    description={form.description}
                    onSubmit={this.registerAsset}
                >
                    {this.formFields(entries)}

                    <div>
                        Category:
                        <select
                            name="categories"
                            value={this.state.categories[0]}
                            onChange={this.inputToArrayChange}
                        >
                            <option value="No Category Specified">
                                No Category Specified
                            </option>
                            <option value="Image Recognition">
                                Image Recognition
                            </option>
                            <option value="Dataset Of Datasets">
                                Dataset Of Datasets
                            </option>
                            <option value="Language">Language</option>
                            <option value="Performing Arts">
                                Performing Arts
                            </option>
                            <option value="Visual Arts & Design">
                                Visual Arts & Design
                            </option>
                            <option value="Philosophy">Philosophy</option>
                            <option value="History">History</option>
                            <option value="Theology">Theology</option>
                            <option value="Anthropology & Archeology">
                                Anthropology & Archeology
                            </option>
                            <option value="Sociology">Sociology</option>
                            <option value="Psychology">Psychology</option>
                            <option value="Politics">Politics</option>
                            <option value="Interdisciplinary">
                                Interdisciplinary
                            </option>
                            <option value="Economics & Finance">
                                Economics & Finance
                            </option>
                            <option value="Demography">Demography</option>
                            <option value="Biology">Biology</option>
                            <option value="Chemistry">Chemistry</option>
                            <option value="Physics & Energy">
                                Physics & Energy
                            </option>
                            <option value="Earth & Climate">
                                Earth & Climate
                            </option>
                            <option value="Space & Astronomy">
                                Space & Astronomy
                            </option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="Computer Technology">
                                Computer Technology
                            </option>
                            <option value="Engineering">Engineering</option>
                            <option value="Agriculture & Bio Engineering">
                                Agriculture & Bio Engineering
                            </option>
                            <option value="Transportation">
                                Transportation
                            </option>
                            <option value="Urban Planning">
                                Urban Planning
                            </option>
                            <option value="Medicine">Medicine</option>
                            <option value="Language">Language</option>
                            <option value="Business & Management">
                                Business & Management
                            </option>
                            <option value="Sports & Recreation">
                                Sports & Recreation
                            </option>
                            <option value="Communication & Journalism">
                                Communication & Journalism
                            </option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <User.Consumer>
                        {states => (
                            <div>
                                {states.isLogged ? (
                                    <Button primary>
                                        Register asset (we are logged)
                                    </Button>
                                ) : (
                                    <Button primary onClick={states.startLogin}>
                                        Register asset (login first)
                                    </Button>
                                )}
                            </div>
                        )}
                    </User.Consumer>
                </Form>
            </div>
        )
    }
}

Publish.contextType = User
export default Publish
