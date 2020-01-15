import React, { ChangeEvent, PureComponent } from 'react'
import Spinner from '../../components/atoms/Spinner'
import Route from '../../components/templates/Route'
import Content from '../../components/atoms/Content'
import Button from '../../components/atoms/Button'
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
    results?: any,
    modalIsOpen: boolean,
    files: File[]
}

class Bounty extends PureComponent<any, any> {

    public static contextType = User

    state: IBountyState = {
        isLoading: true,
        results: [],
        modalIsOpen: false,
        files: []
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
    }

    toggleModal = () => {
        this.setState({ modalIsOpen: !this.state.modalIsOpen })
    }

    private inputChange = (
        event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
    ) => {
        this.setState({
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    formFields = (entries: any[]) =>
        entries.map(([key, value]) => {

            if (key === 'files') {
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
                        disabled={key === 'submit' ? false : (!this.context.ocean)}
                    />
                )
            }
        })

    public render() {
        const { account } = this.context
        const { isLoading, results, modalIsOpen } = this.state
        const entries = Object.entries(form.fields)

        return (
            <Route title="Bounty">
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
                                    <span><b>Reward:</b> {results.ipfsData.payload.fulfillmentAmount} TOKEN</span>
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
                                    <a className={styles.button} onClick={() => this.toggleModal()}>Contribute</a>
                                    { account === results.issuers[0] &&
                                        (<a className={styles.button} onClick={() => {}}>Publish</a>)
                                    }
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
                            <Form title={form.title} description={form.description} onSubmit={undefined}>
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
