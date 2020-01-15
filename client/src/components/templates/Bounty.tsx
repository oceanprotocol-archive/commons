import React, { ChangeEvent, PureComponent, FormEvent } from 'react'
import { ToastMessage } from 'rimble-ui';
import Spinner from '../../components/atoms/Spinner'
import Route from '../../components/templates/Route'
import Content from '../../components/atoms/Content'
import Button from '../../components/atoms/Button'
import { IpfsConfig, getIpfsInstance, uploadJSON, fetchJSON } from '../../utils/ipfs'
import { validNetwork, contributeBounty } from '../../web3'
import { generateKeyPairs, uploadDocument } from '../../nucypher'
import { ipfsNodeUri } from '../../config'
import { getBounties } from '../../graphql'
import moment from 'moment'
import styles from './Bounty.module.scss'
import { User } from '../../context'
import Form from '../../components/atoms/Form/Form'
import form from '../../data/form-contribute.json'
import Modal from '../../components/atoms/Modal'
import Input from '../../components/atoms/Form/Input'
import Label from '../../components/atoms/Form/Label'
import Files from '../../routes/Publish/Files'


interface IBountyState {
    isLoading: boolean,
    processing: boolean
    doneProcessing: boolean
    error: string
    results?: any
    modalIsOpen: boolean
    files: File[]
    password: string
    dataFile?: File
    encryptedData?: any
    dataHash?: string
    ipfs?: any
    box?: any
    space?: any
}

class Bounty extends PureComponent<any, any> {

    public static contextType = User

    state: IBountyState = {
        isLoading: true,
        processing: false,
        doneProcessing: false,
        error: '',
        results: [],
        modalIsOpen: false,
        files: [],
        password: ''
    }

    bountyMeta = {
        platform: "decentraminds",
        schemaVersion: "1.0",
        schemaName: "decentramindsSchema"
    }

    componentDidMount() {
        getBounties(this.props.match.params.bountyId).then((rs) => {
            if(rs) {
                console.log(rs[0])
                this.setState({ results: rs[0], isLoading: false })
            }
        }).catch((err) => {
            console.log('err', err)
            this.setState({ results: [], isLoading: false })
        });
        const { hostname, port, protocol } = new URL(ipfsNodeUri)
        const ipfsConfig: IpfsConfig = {
            protocol: protocol.replace(':', ''),
            host: hostname,
            port: port || '443'
        }
        try {
            const ipfs = getIpfsInstance(ipfsConfig)
            this.setState({ ipfs })
        } catch(error) {
            console.log('Failed to get IPFS instance', error)
            this.setState({ error: error.message })
        }
    }

    toggleModal = async () => {
        const { modalIsOpen } = this.state
        if (!modalIsOpen) {
            const { ocean, wallet } = this.context
            if (!ocean) {
                this.setState({ error: 'Please Connect to your Wallet' })
                setTimeout(() => this.setState({ error: '' }), 5000)
                return
            } else {
                if (!this.state.box || !this.state.space) {
                    wallet.toggleModal()
                    const rs = await wallet.openBox()
                    wallet.toggleModal()
                    const password = await rs.space.private.get('password')
                    this.setState({ box: rs.box, space: rs.space, password: password ? password:'' })
                    // await rs.space.private.remove('bobKey')
                    // const data = await rs.space.private.all()
                    // console.log('sdasdasdasd', data)
                }
                
            }
        }
        this.setState({ modalIsOpen: !modalIsOpen })
    }

    private inputChange = (
        // event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
        event: ChangeEvent<any>
    ) => {
        if (event.currentTarget.name === 'files') {
            console.log("Files found", event, event.target.files, event.currentTarget)
            this.setState({ dataFile: event.target.files[0]})
        }
        this.setState({
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    encryptData = async () => {
        const { ocean, wallet } = this.context
        const { password, dataFile, ipfs } = this.state
        if (dataFile && password) {
            if (!ocean) {
                this.setState({ error: 'Please Connect to your Wallet' })
                setTimeout(() => this.setState({ error: '' }), 5000)
                return
            } else {
                if (!this.state.box || !this.state.space) {
                    wallet.toggleModal()
                    const rs = await wallet.openBox()
                    wallet.toggleModal()
                    this.setState({ box: rs.box, space: rs.space })
                }
                let { box, space } = this.state

                const id = await box.public.all()
                console.log('USER', id.proof_did)
                const userId = id.proof_did

                const spaceData = await space.private.all()
                console.log('space', spaceData)
                console.log('Files', dataFile, password)
                const reader = new FileReader();

                reader.onload = async () => {
                    const data = reader.result ? (reader.result) as string:''
                    // const records = data.split('\n')
                    this.setState({ processing: true })

                    const records = JSON.parse(data)
                    const test = records[0]

                    const keys = Object.keys(spaceData)
                    let aliceKey: string;
                    if(!keys.includes('aliceKey')) {
                       const rs = await generateKeyPairs(userId, password)
                       console.log('Keys', rs)
                       aliceKey = rs.aliceKey
                       await space.private.setMultiple(['aliceKey', 'bobKey', 'password'], [rs.aliceKey, rs.bobKey, password])
                    } else {
                        aliceKey = spaceData['aliceKey']
                    }
                    const encryptedData = await Promise.all(records.map(async (record: any) => {
                        return uploadDocument(record, userId, password, aliceKey)    
                    }))
                    console.log('encryptedDATA FINAL', encryptedData)
                    const dataHash = await uploadJSON(ipfs, encryptedData)
                    console.log('dataHash', dataHash)
                    window.open(`https://ipfs.oceanprotocol.com/ipfs/${dataHash}`, '_blank')
                    this.setState({ encryptedData, dataHash, processing: false })
                };
                reader.readAsBinaryString(dataFile);
            }
        }
    }

    formFields = (entries: any[]) =>
        entries.map(([key, value]) => {
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
                        value={(key === 'encrypt' ? value.value:(this.state as any)[key])}
                        onChange={(event: any) => {
                            if (key === 'encrypt') {
                                // this.inputChange(event)
                                this.encryptData()
                            } else {
                                this.inputChange(event)
                            }
                        }}
                    />
                )
        })

    sendContribution = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const { ipfs, encryptedData, dataHash } = this.state
        const { ocean, network } = this.context
        const bountyId = this.props.match.params.bountyId
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
        if(!encryptedData) {
            // TOOD: handle error
            this.setState({ error: "You need to encrypt your data first" })
            setTimeout(() => this.setState({ error: '' }), 5000)
            return
        }
        if (ipfs) {

            // const dataHash = await uploadJSON(ipfs, encryptedData)
            // const dataHash = 'QmeKjsdqqT5qfVmzNiyaQbx2mz9XFDs13eqwmnCuv6MzDU'

            const sender = (await ocean.web3.eth.getAccounts())[0]

            const data = {
              payload: {
                description: 'Data Contribution',
                sourceFileName: '',
                sourceFileHash: dataHash,
                sourceDirectoryHash: 'https://ipfs.oceanprotocol.com/ipfs/',
                fulfillers: [
                  sender
                ],
                payoutAmounts: [
                  100
                ]
              },
              meta: this.bountyMeta
            }

            const payloadHash = await uploadJSON(ipfs, data)
            // const payloadHash = 'QmeKjsdqqT5qfVmzNiyaQbx2mz9XFDs13eqwmnCuv6MzDU'
            console.log('IPFS rs', payloadHash)

            const params = [
                sender,
                bountyId,
                [sender], // _fulfillers
                payloadHash // _data
            ]

            console.log('params', params)

            this.setState({ processing: true })
            const receipt = await contributeBounty(ocean.web3, params)

            this.toggleModal()

            this.setState({ processing: false, doneProcessing: true })
            setTimeout(() => this.setState({ doneProcessing: false }), 5000)
        } else {
            this.setState({ error: 'No IPFS instance available. Try again later' })
            setTimeout(() => this.setState({ error: '' }), 5000)
        }

    }

    public render() {
        const { account } = this.context
        const { isLoading, processing, doneProcessing, error, results, modalIsOpen } = this.state
        const entries = Object.entries(form.fields)

        console.log(this.state)

        return (
            <Route title="Bounty" description="Challenge Details">
                {doneProcessing && (
                    <ToastMessage.Success
                      className="toastMsg"
                      my={3}
                      message={"Data Contribution"}
                      secondaryMessage={"Your Data Contribution has been successfully submitted!"}
                      actionText={"See Trx"}
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
                {isLoading ? (
                    <Spinner message="Loading..." />
                ) : (
                    <Content>
                        { results && results.ipfsData ? (
                            <div className={styles.bounty}>
                                <h2>{results.ipfsData.payload.title}</h2>
                                <p>{results.ipfsData.payload.description}</p>
                                { results.ipfsData.payload.categories.map((cat: string) => (<span className={styles.tag} key={cat}>{cat}</span>)) }
                                <div className={styles.info}>
                                    <span><b>Reward:</b> {results.ipfsData.payload.fulfillmentAmount} OCEAN</span>
                                    <span><b>Difficulty:</b> {results.ipfsData.payload.difficulty}</span>
                                    <span><b>Deadline:</b> {moment(results.ipfsData.payload.deadline).format('DD/MM/YYYY')}</span>
                                    <span><b>Creator:</b> {results.creator}</span>
                                    <span><b>Token:</b> {results.token}</span>
                                    <div className={styles.centeredWrapper}>
                                        <div className={styles.fileWrap}>
                                            <ul className={styles.file}>
                                                <li>{results.ipfsData.payload.ipfsFilename}</li>
                                            </ul>
                                            <a className={styles.button} href={`${ipfsNodeUri}/ipfs/${results.ipfsData.payload.ipfsHash}/${results.ipfsData.payload.ipfsFilename}`} target="_blank">Schema</a>
                                        </div>
                                        <div className={styles.fileWrap}>
                                        <ul className={styles.file}>
                                                <li></li>
                                            </ul>
                                            <a className={styles.button} href={results.ipfsData.payload.webReferenceURL} target="_blank">Attachment</a>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.centeredWrapper}>
                                    { account.toLowerCase() !== results.issuers[0] && (
                                        <a className={styles.button} onClick={() => this.toggleModal()}>Contribute with Data</a>
                                    )}
                                    { account.toLowerCase() === results.issuers[0] &&
                                        (<a className={styles.button} onClick={() => {}}>Deposit Tokens</a>
                                    )}
                                        { account.toLowerCase() === results.issuers[0] &&
                                        (<a className={styles.button} onClick={() => {}}>Publish Asset</a>
                                    )}
                                </div>
                            </div>
                        ):(
                            <p>Bounty does not exist.</p>
                        )}
                        <Modal
                            isOpen={modalIsOpen}
                            onAfterOpen={() => console.log('Modal has opened')}
                            onRequestClose={this.toggleModal}
                            toggleModal={() => this.toggleModal()}>
                            {processing && (
                                <ToastMessage.Processing
                                  className="toastMsg"
                                  my={3}
                                  message={"Processing"}
                                  secondaryMessage={"Processing request..."}
                                />
                            )}
                            <Form title={form.title} description={form.description} onSubmit={this.sendContribution}>
                            {this.formFields(entries)}
                            </Form>
                        </Modal>
                    </Content>
                )
                }
            </Route>
        )
    }
}

export default Bounty
