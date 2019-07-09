import React, { PureComponent } from 'react'
import Modal from '../atoms/Modal'
import { User } from '../../context'
import styles from './WalletSelector.module.scss'
import Button from '../atoms/Button'

export default class WalletSelector extends PureComponent<
    {},
    {
        isModalOpen: boolean
    }
> {
    public state = {
        isModalOpen: false
    }

    private toggleModal = () => {
        this.setState({ isModalOpen: !this.state.isModalOpen })
    }

    private loginBurnerWallet = () => {
        this.context.loginBurnerWallet()
        this.toggleModal()
    }

    private loginMetamask = () => {
        this.context.loginMetamask()
        this.toggleModal()
    }


    public render() {
        return (
            <div className={styles.actions}>
                <Button
                    link
                    className={styles.openLink}
                    onClick={this.toggleModal}
                >
                    Select wallet
                </Button>
                <Modal
                    title="Select wallet"
                    description="Select wallet."
                    isOpen={this.state.isModalOpen}
                    toggleModal={this.toggleModal}
                >
                    <div className={styles.info}>
                        <button onClick={this.loginBurnerWallet}>login BurnerWallet</button>
                        <button onClick={this.loginMetamask}>login Metamask</button>
                    </div>
                </Modal>
            </div>
        )
    }
}

WalletSelector.contextType = User
