import React, { ChangeEvent, Component, FormEvent } from 'react'
import { File } from '@oceanprotocol/squid'
import { ToastMessage } from 'rimble-ui';
import Route from '../../components/templates/Route'
import AssetsUser from '../../components/organisms/AssetsUser'
import Web3message from '../../components/organisms/Web3message'
import { Market } from '../../context'
import Content from '../../components/atoms/Content'
import Form from '../../components/atoms/Form/Form'
import Modal from '../../components/atoms/Modal'
import Input from '../../components/atoms/Form/Input'
import Button from '../../components/atoms/Button'
import Label from '../../components/atoms/Form/Label'
import Files from '../Publish/Files'
import form from '../../data/form-new-bounty.json'

// import withTracker from '../hoc/withTracker'

// Ref https://github.com/Bounties-Network/StandardBounties/blob/master/docs/standardSchemas.md

interface IBountiesState {
    modalIsOpen: boolean
    doneProcessing: boolean
    name: string // bounty meta
    description: string // bounty meta
    category: string
    categories: Array<string> // bounty meta
    fulfillmentAmount: string // bounty meta
    difficulty: string // bounty meta
    fulfillersNeedApproval: string // bounty meta
    dataSchemaURIs: File[] // bounty meta: ipfsHash & ipfsFilename
    webReferenceURIs: File[] // bounty meta
    expectedRevisions: number // bounty meta - set as a constant
    privateFulfillments: boolean // bounty meta - set as a constant    
}

class Bounties extends Component {
    public static contextType = Market

    state: IBountiesState = {
        modalIsOpen: false,
        doneProcessing: false,
        name: '',
        description: '',
        category: '',
        categories: [],
        fulfillmentAmount: '',
        difficulty: 'Easy',
        fulfillersNeedApproval: 'No',
        dataSchemaURIs: [],
        webReferenceURIs: [],
        expectedRevisions: 1,
        privateFulfillments: false
       
    }

    bountyMeta = {
        platform: "ocean",
        schemaVersion: "1.0",
        schemaName: "decentramindsSchema"
    }

    formFields = (entries: any[]) =>
        entries.map(([key, value]) => {

            if (key === 'dataSchemaURIs' || key === 'webReferenceURIs') {
                return (
                    <>
                        <Label htmlFor={key} required>
                            {value.label}
                        </Label>
                        <Files
                            placeholder={value.placeholder}
                            name={key}
                            help={value.help}
                            files={(this.state as any)[key]}
                            onChange={this.inputChange}
                        />
                    </>
                )
            } else {
                return (
                    <Input
                        key={key}
                        name={key}
                        label={value.label}
                        placeholder={value.placeholder}
                        required={value.required}
                        type={value.type}
                        options={value.options}
                        help={value.help}
                        value={(this.state as any)[key]}
                        onChange={this.inputChange}
                    />
                )
            }
        })

    private inputChange = (
        event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
    ) => {
        // this.validateInputs(event.currentTarget.name, event.currentTarget.value)

        this.setState({
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    createNewBounty = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const categories = [this.state.category, 'crowdsource']
        const ipfsURI = this.state.dataSchemaURIs[0].url
        const ipfsHash = ipfsURI.match(/(?!=(\:\/\/))([A-Z0-9]+)(?=\/)/gi)
        const ipfsFilename = ipfsURI.match(/(?!=\/)([A-Z0-9\.]+)$/gi)

        const webReferenceURL = this.state.dataSchemaURIs[0].url
        

        console.log('submit', this.state)
        this.setState({ doneProcessing: true })
        setTimeout(() => this.setState({ doneProcessing: false }), 5000)
    }

    openModal = () => {
        console.log('Opening modal')
        this.setState({modalIsOpen: true})
    }

    closeModal = () => {
        console.log('Closing modal')
        this.setState({modalIsOpen: false})
    }

    public render() {

        const { modalIsOpen, doneProcessing } = this.state
        const entries = Object.entries(form.fields)

        return (
            <Route title="Bounties">
                {doneProcessing && (
                    <ToastMessage.Success
                      className="toastMsg"
                      my={3}
                      message={"Bounty Created"}
                      secondaryMessage={"Your Data Bounty has been successfully created!"}
                      actionText={"See Bounty"}
                      actionHref={"#!"}
                    />
                )}
                
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={() => console.log('Modal has opened')}
                    onRequestClose={this.closeModal}
                    toggleModal={() => this.closeModal()}>
                    <Form title={form.title} description={form.description} onSubmit={this.createNewBounty}>
                        {this.formFields(entries)}
                    </Form>
                </Modal>
                <Content>
                    {/* <AssetsUser list /> */}
                    <div>Bounties</div>
                    <Button onClick={() => this.openModal()} primary>Create a Data Bounty</Button>
                </Content>
            </Route>
        )
    }
}

// export default withTracker(History)
export default Bounties
