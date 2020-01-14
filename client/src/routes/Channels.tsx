import React, { Component } from 'react'
import { ToastMessage } from 'rimble-ui'
import Route from '../components/templates/Route'
import Content from '../components/atoms/Content'
import Button from '../components/atoms/Button'
import Spinner from '../components/atoms/Spinner'
import Form from '../components/atoms/Form/Form'
import Modal from '../components/atoms/Modal'
import Input from '../components/atoms/Form/Input'
import form from '../data/form-channel-thread.json'
import UnionTeaser from '../components/organisms/UnionTeaser'
import { boxUnionsModerator } from '../config'
import { getDataUnions, createDataUnion } from '../box'
import { User } from '../context'
// import withTracker from '../hoc/withTracker'

interface IChannelsState {
    isLoading: boolean
    processingMsg: string
    success: boolean
    error: string
    modalIsOpen: boolean
    unions: Array<any>
    box?: any
    space? : any
}

class Channels extends Component {

    public static contextType = User

    state: IChannelsState = {
        isLoading: true,
        processingMsg: '',
        success: false,
        error: '',
        modalIsOpen: false,
        unions: [] 
    }

    componentDidMount() {
        this.getUnions();
    }

    getUnions() {
        getDataUnions().then(unions => this.setState({ unions, isLoading: false }));
    }

    formFields = (entries: any[]) =>
        entries.map(([key, value]) => (
            <Input
                key={key}
                name={key}
                label={value.label}
                placeholder={value.placeholder}
                required={value.required}
                type={value.type}
                options={value.options}
                value={value.value}
            />
        ))

    createChannel = async (event: any) => {
        event.preventDefault();
        const { space } = this.state
        const { account } = this.context
        if (event.target) {
            const name = event.target.elements[0].value;
            const industry = event.target.elements[1].value;
            const tag = name.toLowerCase().replace(/\s/g,'-')
            const teaser = event.target.elements[2].value;
            const description = event.target.elements[3].value;
            this.setState({ processingMsg: 'Registering your Data Union....' });
            const dataUnion = { 
                address: '',
                moderator: account,
                name,
                industry,
                tag,
                teaser,
                description
            };
            try {
                await createDataUnion(space, tag, dataUnion);
                this.setState({ modalIsOpen: false, processingMsg: '', success: true });
                setTimeout(() => this.setState({ success: false }), 5000)
                this.getUnions();
            } catch (error) {
                this.setState({ processingMsg: '', error: error.message })
                setTimeout(() => this.setState({ error: '' }), 5000)
            }
        }
    }

    openModal = async () => {
        const { box, space } = this.state
        const { isLogged, wallet } = this.context
        if (!isLogged) {
            this.setState({ error: 'Please connect to your wallet!' })
            setTimeout(() => this.setState({ error: '' }), 5000)
        } else {
            if (!box || !space) {
                this.setState({ processingMsg: 'Opening your Profile....' })
                setTimeout(() => this.setState({ processingMsg: '' }), 5000)
                wallet.toggleModal()
                const rs = await wallet.openBox()
                wallet.toggleModal()
                this.setState({ box: rs.box, space: rs.space })
            }
            this.setState({ modalIsOpen: true })
        }
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false, processingMsg: '' })
    }

    public render() {

        const  { modalIsOpen, isLoading, processingMsg, unions, success, error } = this.state;
        const entries = Object.entries(form.fields)

        return (
            <Route title="Data Unions" description="The place where the Enterprise & Academia join forces to build better data science solutions">
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={() => console.log('Modal has opened')}
                    onRequestClose={this.closeModal}
                    toggleModal={() => this.closeModal()}>
                    <Form title={form.title} description={form.description} onSubmit={this.createChannel}>
                        {this.formFields(entries)}
                    </Form>
                </Modal>
                {processingMsg && (
                    <ToastMessage.Processing
                      className="toastMsg"
                      my={3}
                      message={"Processing"}
                      secondaryMessage={processingMsg}
                    />
                )}
                {success && (
                    <ToastMessage.Success
                      className="toastMsg"
                      my={3}
                      message={"Data Union Created"}
                      secondaryMessage={"Your Data Union has been successfully created!"}
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
                <Content>
                    <Button onClick={() => this.openModal()} primary>Create a Data Union</Button>
                </Content>
                {isLoading ? (
                    <Spinner />
                ):(
                    <Content wide>
                        {unions.length > 0 ? (unions.map(union => (
                            <UnionTeaser
                                key={union.legalName.value.toLowerCase().replace(/\s/g,'-')}
                                union={union}
                            />
                            ))):
                            (
                                <h2>No Data Unions found. Be the first to create one</h2>
                            )
                        }
                    </Content>
                 )}
            </Route>
        )
    }
}

// export default withTracker(Channels)
export default Channels
