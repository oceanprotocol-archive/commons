import React, { ChangeEvent, Component, FormEvent } from 'react'
import { File } from '@oceanprotocol/squid'
import { ToastMessage } from 'rimble-ui';
import { ipfsNodeUri } from '../../config'
import { IpfsConfig, getIpfsInstance } from '../../utils/ipfs'
import { validNetwork, publishBounty } from '../../web3'
import Route from '../../components/templates/Route'
import BountiesList from '../../components/organisms/BountiesList'
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
    processing: boolean
    doneProcessing: boolean
    error: string
    title: string // bounty meta
    description: string // bounty meta
    category: string
    categories: Array<string> // bounty meta
    fulfillmentAmount: string // bounty meta
    difficulty: string // bounty meta
    fulfillersNeedApproval: string // bounty meta
    dataSchemaURIs: File[] // bounty meta: ipfsHash & ipfsFilename
    webReferenceURIs: File[] // bounty meta
    deadline: string,
    expectedRevisions: number // bounty meta - set as a constant
    privateFulfillments: boolean // bounty meta - set as a constant
    ipfs?: any
}

class Bounties extends Component {
    public static contextType = Market

    state: IBountiesState = {
        modalIsOpen: false,
        processing: false,
        doneProcessing: false,
        error: '',
        title: '',
        description: '',
        category: '',
        categories: [],
        fulfillmentAmount: '',
        difficulty: 'Easy',
        fulfillersNeedApproval: 'No',
        dataSchemaURIs: [],
        webReferenceURIs: [],
        deadline:  new Date().toISOString(),
        expectedRevisions: 1,
        privateFulfillments: false
    }

    bountyMeta = {
        platform: "decentraminds",
        schemaVersion: "1.0",
        schemaName: "decentramindsSchema"
    }

    componentDidMount() {
        const { hostname, port, protocol } = new URL(ipfsNodeUri)
        const ipfsConfig: IpfsConfig = {
            protocol: protocol.replace(':', ''),
            host: hostname,
            port: port || '443'
        }
        try {
            const ipfs = getIpfsInstance(ipfsConfig)
            this.setState({ ipfs })
            // fetchJSON(ipfs, 'QmUsTYCrDicexj5BV2Nq1zDHZKBaMpcA5ywRB18bbJycFC')
            //     .then(rs => console.log('fetchJSON', rs))
            //     .catch(error => console.log('fetch error', error))
            // TODO: delete the code below
            this.setState({
                title: "title",
                description: "description",
                fulfillmentAmount: "10",
                category: "Agriculture & Bio Engineering",
                difficulty: "Easy",
                fulfillersNeedApproval: "No"
            })

        } catch(error) {
            console.log('Failed to get IPFS instance', error)
            this.setState({ error: error.message })
        }


    }

    formFields = (entries: any[]) =>
        entries.map(([key, value]) => {

            if (key === 'dataSchemaURIs' || key === 'webReferenceURIs') {
                return (
                    <div key={key}>
                        <Label htmlFor={key} required>
                            {value.label}
                        </Label>
                        <Files
                            placeholder={value.placeholder}
                            name={key}
                            help={value.help}
                            files={(this.state as any)[key]}
                            onChange={this.inputChange}
                            excludeButtons={key === 'dataSchemaURIs' ? ['url']:['ipfs']}
                        />
                    </div>
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
                        disabled={key === 'submit' ? false : (!this.context.ocean || this.state.processing)}
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
        const { ipfs } = this.state
        const { ocean, network } = this.context
        console.log(this.context)
        if (!ocean) {
            this.setState({ error: 'Please Connect to your Wallet' })
            setTimeout(() => this.setState({ error: '' }), 5000)
            return
        }
        if(!validNetwork(ocean.web3, network)) {
            this.setState({ error: "Please swicth your wallet to the correct network" })
            setTimeout(() => this.setState({ error: '' }), 5000)
            return
        }
        if (ipfs) {
            console.log('IPFS FOUND!')
            try {

                const { title, description, fulfillmentAmount, difficulty, fulfillersNeedApproval } = this.state
                const { privateFulfillments, expectedRevisions, deadline, dataSchemaURIs, webReferenceURIs } = this.state
                const categories = [this.state.category, 'crowdsource']
                // TODO: validate empty value
                const ipfsURI = (dataSchemaURIs.length > 0 && dataSchemaURIs[0].url) || "ipfs://QmRkiAVsLaZS26Rmj8ke3jPBEqjJnX2KWPdcn1P7w2oBP6/schema.json"
                const _ipfsHash = ipfsURI.match(/(?!=(\:\/\/))([A-Z0-9]+)(?=\/)/gi)
                const _ipfsFilename = ipfsURI.match(/(?!=\/)([A-Z0-9\.]+)$/gi)

                // TODO: validate null values
                const ipfsHash = _ipfsHash && _ipfsHash.length > 0 ? _ipfsHash[0]:"QmRkiAVsLaZS26Rmj8ke3jPBEqjJnX2KWPdcn1P7w2oBP6"
                const ipfsFilename = _ipfsFilename && _ipfsFilename.length > 0 ? _ipfsFilename[0]:'schema.json'

                // TODO: validate empty value
                const webReferenceURL = (webReferenceURIs.length > 0 && webReferenceURIs[0].url) || "ipfs://QmRkiAVsLaZS26Rmj8ke3jPBEqjJnX2KWPdcn1P7w2oBP6/schema.json"

                const data = {
                    payload: {
                        title, description, fulfillmentAmount, categories, expectedRevisions, difficulty,
                        privateFulfillments, fulfillersNeedApproval, ipfsFilename, ipfsHash, webReferenceURL,
                        // TODO: set deadline
                        // deadline
                        deadline: new Date("04-01-2020")

                    },
                    meta: this.bountyMeta
                }
                console.log('onSubmit', data)

                // TODO: enable IPFS upload
                // const payloadHash = await uploadJSON(ipfs, data)
                const payloadHash = 'QmeKjsdqqT5qfVmzNiyaQbx2mz9XFDs13eqwmnCuv6MzDU'
                console.log('IPFS rs', payloadHash)

                // TODO: create a new continuous token
                // TOOD: allow users to seleect token
                const tokenAddress = ocean.keeper.token.getAddress()
                const sender = (await ocean.web3.eth.getAccounts())[0]
                const params = [
                    sender,
                    [sender], // _issuers
                    [sender], // _approvers
                    payloadHash, // _data
                    new Date(deadline).getTime(), // _deadline
                    tokenAddress, // _token
                    20 // _tokenVersion

                ]

                console.log('params', params)

                this.setState({ processing: true })
                const receipt = await publishBounty(ocean.web3, params)

                this.toggleModal()

                this.setState({ processing: false, doneProcessing: true })
                setTimeout(() => this.setState({ doneProcessing: false }), 5000)
            } catch (error) {
                this.setState({ error: error.message })
                setTimeout(() => this.setState({ error: '' }), 5000)
            }
        } else {
            this.setState({ error: 'No IPFS instance found' })
            setTimeout(() => this.setState({ error: '' }), 5000)
        }
    }

    toggleModal = () => {
        this.setState({ modalIsOpen: !this.state.modalIsOpen })
    }

    public render() {

        const { modalIsOpen, processing, doneProcessing, error } = this.state
        const entries = Object.entries(form.fields)

        return (
            <Route title="Bounties">
                {processing && (
                    <ToastMessage.Success
                      className="toastMsg"
                      my={3}
                      message={"New Data Bounty"}
                      secondaryMessage={"Publishing your Data Bounty in the Marketplace..."}
                    />
                )}
                {doneProcessing && (
                    <ToastMessage.Processing
                      className="toastMsg"
                      my={3}
                      message={"Bounty Created"}
                      secondaryMessage={"Your Data Bounty has been successfully created!"}
                      actionText={"See Bounty"}
                      actionHref={"#!"}
                    />
                )}

                {error && (
                    <ToastMessage.Failure
                      className="toastMsg"
                      my={3}
                      message={"Error!"}
                      secondaryMessage={error}
                    />
                )}

                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={() => console.log('Modal has opened')}
                    onRequestClose={this.toggleModal}
                    toggleModal={() => this.toggleModal()}>
                    <Form title={form.title} description={form.description} onSubmit={this.createNewBounty}>
                        {this.formFields(entries)}
                    </Form>
                </Modal>
                <Content>
                    <Button onClick={() => this.toggleModal()} primary>Create a Data Bounty</Button>
                </Content>
                <Content>
                    <BountiesList />
                </Content>
            </Route>
        )
    }
}

// export default withTracker(History)
export default Bounties
