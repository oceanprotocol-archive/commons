import React, { PureComponent, ChangeEvent } from 'react'
import axios from 'axios'
import { Logger } from '@oceanprotocol/squid'
import Modal from '../../atoms/Modal'
import styles from './Report.module.scss'
import Button from '../../atoms/Button'
import Input from '../../atoms/Form/Input'
import Form from '../../atoms/Form/Form'
import { serviceUri } from '../../../config'
import Spinner from '../../atoms/Spinner'

export default class Report extends PureComponent<
    { did: string; title: string },
    {
        isModalOpen: boolean
        comment: string
        message: string
        isSending: boolean
        hasError?: boolean
        hasSuccess?: boolean
    }
> {
    public state = {
        isModalOpen: false,
        comment: '',
        message: 'Sending...',
        isSending: false,
        hasError: false,
        hasSuccess: false
    }

    // for canceling axios requests
    public signal = axios.CancelToken.source()

    public componentWillUnmount() {
        this.signal.cancel()
    }

    private handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            comment: event.target.value
        })
    }

    private handleToggleModal = () => {
        this.setState({ isModalOpen: !this.state.isModalOpen })
        this.state.isModalOpen && this.reset()
    }

    private reset() {
        this.setState({
            comment: '',
            message: 'Sending...',
            isSending: false,
            hasError: false,
            hasSuccess: false
        })
    }

    private sendEmail = async (event: Event) => {
        event.preventDefault()
        this.setState({ isSending: true })

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

            this.setState({
                isSending: false,
                hasSuccess: true,
                message: 'Thanks for the report! We will take a look soon.'
            })
            return response.data.result
        } catch (error) {
            !axios.isCancel(error) &&
                this.setState({
                    message: error.message,
                    isSending: false,
                    hasError: true
                }) &&
                Logger.error(error.message)
        }
    }

    public render() {
        return (
            <div className={styles.actions}>
                <Button
                    link
                    className={styles.openLink}
                    onClick={this.handleToggleModal}
                >
                    Report Data Set
                </Button>
                <Modal
                    title="Report Data Set"
                    description="Found some faulty metadata, wrongly attributed data, or anything else wrong with this data set? Tell us about it and we will take a look."
                    isOpen={this.state.isModalOpen}
                    onToggleModal={this.handleToggleModal}
                >
                    <div className={styles.info}>
                        <h3>{this.props.title}</h3>
                        <p>
                            <code>{this.props.did}</code>
                        </p>

                        {this.state.isSending ? (
                            <Spinner message={this.state.message} />
                        ) : this.state.hasError ? (
                            <div className={styles.error}>
                                {this.state.message}
                            </div>
                        ) : this.state.hasSuccess ? (
                            <div className={styles.success}>
                                {this.state.message}
                            </div>
                        ) : (
                            <Form minimal>
                                <Input
                                    type="textarea"
                                    name="comment"
                                    label="Comment"
                                    help="Briefly describe what is wrong with this asset. If you want to get contacted by us, add your email at the end."
                                    required
                                    value={this.state.comment}
                                    onChange={this.handleInputChange}
                                    rows={1}
                                />
                                <Button
                                    primary
                                    onClick={(e: Event) => this.sendEmail(e)}
                                    disabled={this.state.comment === ''}
                                    data-testid="report"
                                >
                                    Report Data Set
                                </Button>
                            </Form>
                        )}
                    </div>
                </Modal>
            </div>
        )
    }
}
