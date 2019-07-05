import React, { PureComponent } from 'react'
import Modal from '../../atoms/Modal'
import styles from './Report.module.scss'
import Button from '../../atoms/Button'
import Input from '../../atoms/Form/Input'
import Form from '../../atoms/Form/Form'

export default class Report extends PureComponent<
    { did: string; title: string },
    { isModalOpen: boolean }
> {
    public state = {
        isModalOpen: false
    }

    public toggleModal = () => {
        this.setState({ isModalOpen: !this.state.isModalOpen })
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
                            />
                            <Button primary>Report Data Set</Button>
                        </Form>
                    </div>
                </Modal>
            </div>
        )
    }
}
