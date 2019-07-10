import React, { PureComponent } from 'react'
import Modal from '../atoms/Modal'
import { User } from '../../context'
import styles from './WalletSelector.module.scss'
import Button from '../atoms/Button'

export default class WalletSelector extends PureComponent<
    {},
    { isModalOpen: boolean }
> {
    public static contextType = User

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
        this.context.logoutBurnerWallet()
        this.toggleModal()
    }

    public render() {
        return (
            <>
                <Button
                    link
                    className={styles.openLink}
                    onClick={this.toggleModal}
                >
                    Select wallet
                </Button>
                <Modal
                    title="Select wallet"
                    description="Select the wallet you want to use in the Commons Marketplace. By default, we create a burner wallet in your browser."
                    isOpen={this.state.isModalOpen}
                    toggleModal={this.toggleModal}
                >
                    <div className={styles.info}>
                        <button
                            className={styles.button}
                            onClick={this.loginBurnerWallet}
                        >
                            <span className={styles.buttonTitle}>
                                BurnerWallet
                            </span>
                            <span className={styles.buttonDescription}>
                                Provides the easiest way to use Commons without
                                further setup. But the wallet will be gone when
                                you change browsers or clear your cache.
                            </span>
                        </button>
                        <button
                            className={styles.button}
                            onClick={this.loginMetamask}
                        >
                            <span className={styles.buttonTitle}>MetaMask</span>
                            <span className={styles.buttonDescription}>
                                Provides the most secure experience attaching
                                everything you do in Commons to an account you
                                control. But you need to setup MetaMask first.
                            </span>
                        </button>
                    </div>
                </Modal>
            </>
        )
    }
}
