import React, { PureComponent, ChangeEvent } from 'react'
import axios from 'axios'
import { Logger } from '@oceanprotocol/squid'
import Modal from '../../atoms/Modal'
import styles from './Report.module.scss'
import Button from '../../atoms/Button'
import Input from '../../atoms/Form/Input'
import Form from '../../atoms/Form/Form'
import { serviceUri } from '../../../config'

export default class Report extends PureComponent<
    { did: string; title: string },
    { isModalOpen: boolean; comment: string; error?: string }
> {
    public state = {
        isModalOpen: false,
        comment: ''
    }

    // for canceling axios requests
    public signal = axios.CancelToken.source()

    public componentWillUnmount() {
        this.signal.cancel()
    }

    private inputChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            comment: event.target.value
        })
    }

    private toggleModal = () => {
        this.setState({ isModalOpen: !this.state.isModalOpen })
    }

    private sendEmail = async (event: Event) => {
        event.preventDefault()

        const msg = {
            to: process.env.REACT_APP_REPORT_EMAIL,
            from: 'info@oceanprotocol.com',
            subject: `[Report] ${this.props.title}`,
            html: `<p>The following data set was reported:</p><p><strong>${this.props.title}</strong><br /><a style="color:#ff4092;text-decoration:none" href="https://commons.oceanprotocol.com/asset/${this.props.did}"><code>${this.props.did}</code></a></p><blockquote><em>${this.state.comment}</em></blockquote>`
        }

        try {
            const response = await axios({
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                url: `${serviceUri}/api/v1/report`,
                data: { msg },
                cancelToken: this.signal.token
            })

            return response.data.result
        } catch (error) {
            !axios.isCancel(error) &&
                this.setState({ error: error.message }) &&
                Logger.error(error.message)
        }
    }

    public render() {
        return (
            <div className={styles.actions}>
                <Button
                    link
                    className={styles.openLink}
                    onClick={this.toggleModal}
                >
                    Report Data Set
                </Button>
                <Modal
                    title="Report Data Set"
                    description="Found something wrong with this data set? Tell us about it and we will take a look."
                    isOpen={this.state.isModalOpen}
                    toggleModal={this.toggleModal}
                >
                    <div className={styles.info}>
                        <h3>{this.props.title}</h3>
                        <p>
                            <code>{this.props.did}</code>
                        </p>

                        <Form minimal>
                            <Input
                                type="textarea"
                                name="comment"
                                label="Comment"
                                help="Briefly describe what is wrong with this asset."
                                required
                                value={this.state.comment}
                                onChange={this.inputChange}
                                rows={2}
                            />
                            <Button
                                primary
                                onClick={(e: Event) => this.sendEmail(e)}
                                disabled={this.state.comment === ''}
                            >
                                Report Data Set
                            </Button>
                        </Form>
                    </div>
                </Modal>
            </div>
        )
    }
}
