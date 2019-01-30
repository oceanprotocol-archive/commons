import React, { ChangeEvent, Component, FormEvent } from 'react'
import Web3 from 'web3'
import Button from '../components/atoms/Button'
import { User } from '../context/User'
import AssetModel from '../models/AssetModel'
import { provideOcean } from '../ocean'

type AssetType = 'dataset' | 'algorithm' | 'container' | 'workflow' | 'other'

interface IState {
    name?: string,
    dateCreated?: Date,
    description?: string,
    files?: string[],
    price?: number,
    author?: string,
    type?: AssetType,
    license?: string,
    copyrightHolder?: string,
    categories?: string[],
    tags?: string[]
}

class Publish extends Component<{}, IState> {

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
        categories: [''],
    }

    public render() {
        return (
            <div>
                <h1>Publish</h1>
                <form onSubmit={this.registerAsset}>
                  <div>Name:<input type="text" name="name" value={this.state.name} onChange={this.inputChange} /></div>
                  <div>Description:<input type="text" name="description" value={this.state.description} onChange={this.inputChange} /></div>
                  <div>Price:<input type="number" name="price" value={this.state.price} onChange={this.inputChange} /></div>
                  <div>Author:<input type="text" name="author" value={this.state.author} onChange={this.inputChange} /></div>
                  <div>Files:<input type="text" name="files" value={this.state.files[0]} onChange={this.inputToArrayChange} /></div>
                  <div>Type:
                      <select name="type" value={this.state.type} onChange={this.inputChange}>
                          <option value="dataset">Data set</option>
                          <option value="algorithm">Algorithm</option>
                          <option value="container">Container</option>
                          <option value="workflow">Workflow</option>
                          <option value="other">Other</option>
                      </select>
                  </div>
                  <div>License:
                      <select name="license" value={this.state.license} onChange={this.inputChange}>
                          <option value="none">No License Specified</option>
                          <option value="Public Domain">Public Domain</option>
                          <option value="CC BY">CC BY: Attribution</option>
                          <option value="CC BY-SA">CC BY-SA: Attribution ShareAlike</option>
                          <option value="CC BY-ND">CC BY-ND: Attribution-NoDerivs</option>
                          <option value="CC BY-NC">CC BY-NC: Attribution-NonCommercial</option>
                          <option value="CC BY-NC-SA">CC BY-NC-SA: Attribution-NonCommercial-ShareAlike</option>
                          <option value="CC BY-NC-ND">CC BY-NC-ND: Attribution-NonCommercial-NoDerivs</option>
                      </select>
                  </div>
                  <div>Category:
                      <select name="categories" value={this.state.categories[0]} onChange={this.inputToArrayChange}>
                          <option value="No Category Specified">No Category Specified</option>
                          <option value="Image Recognition">Image Recognition</option>
                          <option value="Dataset Of Datasets">Dataset Of Datasets</option>
                          <option value="Language">Language</option>
                          <option value="Performing Arts">Performing Arts</option>
                          <option value="Visual Arts & Design">Visual Arts & Design</option>
                          <option value="Philosophy">Philosophy</option>
                          <option value="History">History</option>
                          <option value="Theology">Theology</option>
                          <option value="Anthropology & Archeology">Anthropology & Archeology</option>
                          <option value="Sociology">Sociology</option>
                          <option value="Psychology">Psychology</option>
                          <option value="Politics">Politics</option>
                          <option value="Interdisciplinary">Interdisciplinary</option>
                          <option value="Economics & Finance">Economics & Finance</option>
                          <option value="Demography">Demography</option>
                          <option value="Biology">Biology</option>
                          <option value="Chemistry">Chemistry</option>
                          <option value="Physics & Energy">Physics & Energy</option>
                          <option value="Earth & Climate">Earth & Climate</option>
                          <option value="Space & Astronomy">Space & Astronomy</option>
                          <option value="Mathematics">Mathematics</option>
                          <option value="Computer Technology">Computer Technology</option>
                          <option value="Engineering">Engineering</option>
                          <option value="Agriculture & Bio Engineering">Agriculture & Bio Engineering</option>
                          <option value="Transportation">Transportation</option>
                          <option value="Urban Planning">Urban Planning</option>
                          <option value="Medicine">Medicine</option>
                          <option value="Language">Language</option>
                          <option value="Business & Management">Business & Management</option>
                          <option value="Sports & Recreation">Sports & Recreation</option>
                          <option value="Communication & Journalism">Communication & Journalism</option>
                          <option value="Other">Other</option>
                      </select>
                  </div>
                  <div>CopyrightHolder:<input type="text" name="copyrightHolder" value={this.state.copyrightHolder} onChange={this.inputChange} /></div>
                  <User.Consumer>
                      {states => ( /* tslint:disable-next-line */
                          <div>
                              {states.isLogged ? (<div><Button>Register asset (we are logged)</Button></div>) : (<div><button onClick={states.startLogin}>Register asset (login first)</button></div>)}
                          </div>
                      )}
                  </User.Consumer>
                </form>
            </div>
        )
    }

    private inputChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    private inputToArrayChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            [event.target.name]: [event.target.value]
        })
    }

    private registerAsset = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const web3 = new Web3((window as any).web3.currentProvider)
        await (window as any).ethereum.enable()
        const { ocean } = await provideOcean()
        const account = await ocean.getAccounts()

        const newAsset = {
            // OEP-08 Attributes
            // https://github.com/oceanprotocol/OEPs/tree/master/8
            base: Object.assign(AssetModel.base, {
                name: this.state.name,
                description: this.state.description,
                dateCreated: (new Date()).toString(),
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
            additionalInformation: Object.assign(AssetModel.additionalInformation)
        }
        const ddo = await ocean.registerAsset(newAsset, account[0])
    }
}

export default Publish
