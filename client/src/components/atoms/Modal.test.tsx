import React from 'react'
import { render } from '@testing-library/react'
import Modal from './Modal'

describe('Modal', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <Modal title="Hello" isOpen toggleModal={() => null}>
                Hello
            </Modal>
        )
        expect(container.firstChild).toBeInTheDocument()
    })
})
