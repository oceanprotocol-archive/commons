import React from 'react'
import { render, fireEvent, waitForElement, act } from '@testing-library/react'
import Ipfs from '.'

const addFile = jest.fn()

describe('IPFS', () => {
    const ui = <Ipfs addFile={addFile} />
    const file = new File(['(⌐□_□)'], 'chucknorris.png', {
        type: 'image/png'
    })

    it('HTTP API: files can be dropped', async () => {
        const { container, getByText } = render(ui)
        expect(container).toBeInTheDocument()

        // wait for IPFS node
        await waitForElement(() => getByText(/Connected to /))

        // drop a file
        const dropzoneInput = container.querySelector('.dropzone')
        Object.defineProperty(dropzoneInput, 'files', { value: [file] })
        act(() => {
            dropzoneInput && fireEvent.drop(dropzoneInput)
        })
        const addingText = await waitForElement(() => getByText(/Adding /))
        expect(addingText).toBeDefined()
    })

    // it('Local Node: files can be dropped', async () => {
    //     const { debug, container, findByText, getByText } = render(
    //         <Ipfs addFile={addFile} node />
    //     )
    //     expect(container).toBeInTheDocument()
    //     // wait for IPFS node
    //     await findByText(/IPFS started/)
    //     // drop a file
    //     const dropzoneInput = container.querySelector('.dropzone input')
    //     Object.defineProperty(dropzoneInput, 'files', { value: [file] })
    //     dropzoneInput && fireEvent.drop(dropzoneInput)
    //     await waitForElement(() => getByText(/File found/), { timeout: 100000 })
    //     expect(addFile).toHaveBeenCalledTimes(1)
    // })
})
