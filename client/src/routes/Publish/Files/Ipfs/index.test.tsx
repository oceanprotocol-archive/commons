import React from 'react'
import { render } from '@testing-library/react'
import Ipfs from '.'

const addFile = jest.fn()

describe('Ipfs', () => {
    const ui = <Ipfs addFile={addFile} />

    it('renders without crashing', async () => {
        const { container, findByText } = render(ui)
        expect(container.firstChild).toBeInTheDocument()

        // wait for IPFS node
        await findByText(/IPFS /)
    })
})
