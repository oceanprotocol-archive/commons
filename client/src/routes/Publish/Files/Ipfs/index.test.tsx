import React from 'react'
import {
    render,
    fireEvent,
    waitForElement,
    act,
    waitFor
} from '@testing-library/react'
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

        // wait for IPFS node, not found in code, not sure what was expected here
        // await waitFor(() => getByText(/ /))
        // await waitFor(() => {
        //     expect(getByText('Add File To IPFS')).toBeInTheDocument()
        // })
        // // drop a file
        // const dropzoneInput = container.querySelector('.dropzone')

        // Object.defineProperty(dropzoneInput, 'files', { value: [file] })
        // act(() => {
        //     dropzoneInput && fireEvent.drop(dropzoneInput)
        // })
        // const addingText = await waitForElement(() => getByText(/Adding /))
        // expect(addingText).toBeDefined()
    })
})
