import React from 'react'
import { render } from '@testing-library/react'
import Ipfs from './Ipfs'

const addFile = jest.fn()

describe('Ipfs', () => {
    it('renders without crashing', async () => {
        const { container, findByText } = render(<Ipfs addFile={addFile} />)
        expect(container.firstChild).toBeInTheDocument()

        // wait for IPFS node
        await findByText(/IPFS /)
    })
})
