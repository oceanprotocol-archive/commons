import React from 'react'
import ReactModal from 'react-modal'
import styles from './Modal.module.scss'

if (process.env.NODE_ENV !== 'test') ReactModal.setAppElement('#root')

const Modal = ({
    title,
    description,
    isOpen,
    onToggleModal,
    children,
    onAfterOpen,
    onRequestClose,
    ...props
}: {
    title: string
    description?: string
    isOpen: boolean
    onToggleModal: () => void
    children: any
    onAfterOpen?: () => void
    onRequestClose?: () => void
}) => {
    return (
        <ReactModal
            isOpen={isOpen}
            onAfterOpen={onAfterOpen}
            onRequestClose={onRequestClose}
            contentLabel={title}
            className={styles.modal}
            overlayClassName={styles.modalOverlay}
            {...props}
        >
            <button
                className={styles.close}
                onClick={onToggleModal}
                data-testid="closeModal"
            >
                &times;
            </button>

            <header className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                {description && (
                    <p className={styles.description}>{description}</p>
                )}
            </header>

            {children}
        </ReactModal>
    )
}

export default Modal
