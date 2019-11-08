import React, { Component } from 'react'
import Route from '../components/templates/Route'
import Content from '../components/atoms/Content'
import Button from '../components/atoms/Button'
import Form from '../components/atoms/Form/Form'
import Modal from '../components/atoms/Modal'
import Input from '../components/atoms/Form/Input'
import channels from '../data/channels.json'
import form from '../data/form-channel-thread.json'
import ChannelTeaser from '../components/organisms/ChannelTeaser'
// import withTracker from '../hoc/withTracker'

interface IChannelsState {
    modalIsOpen: boolean
    channelName: string
    channelIndustry: string
}

class Channels extends Component {

    state: IChannelsState = {
        modalIsOpen: false,
        channelName: '',
        channelIndustry: ''
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
        console.log('Create channel')
        if (event.target) {
            const name = event.target.elements[0].value;
            const industry = event.target.elements[1].value;
            console.log('New channel info', name, industry)
        }
        event.preventDefault();

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

        const  { modalIsOpen } = this.state;
        const entries = Object.entries(form.fields)

        return (
            <Route title={channels.title} description={channels.description}>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={() => console.log('Modal has opened')}
                    onRequestClose={this.closeModal}
                    toggleModal={() => this.closeModal()}>
                    <Form title={form.title} description={form.description} onSubmit={this.createChannel}>
                        {this.formFields(entries)}
                    </Form>
                </Modal>
                <Button onClick={() => this.openModal()} primary>Create New Channel</Button>
                <Content wide>
                    {channels.items.map(channel => (
                        <ChannelTeaser
                            key={channel.title}
                            channel={channel.tag}
                        />
                    ))}
                </Content>
            </Route>
        )
    }
}

// export default withTracker(Channels)
export default Channels
