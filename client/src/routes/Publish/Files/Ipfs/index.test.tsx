import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Ipfs from '.'

const addFile = jest.fn()

describe('Ipfs', () => {
    const ui = <Ipfs addFile={addFile} />

    it('renders without crashing', async () => {
        const { container, findByText } = render(ui)
        expect(container.firstChild).toBeInTheDocument()

        // wait for IPFS node
        await findByText(/Connected to /)
    })

    it('files can be dropped', async () => {
        const { container, findByText } = render(ui)

        // wait for IPFS node
        await findByText(/Connected to /)

        const file = new File(['(⌐□_□)'], 'chucknorris.png', {
            type: 'image/png'
        })

        // drop a file
        const dropzoneInput = container.querySelector('.dropzone input')
        dropzoneInput && fireEvent.change(dropzoneInput, { target: [file] })
    })
})
