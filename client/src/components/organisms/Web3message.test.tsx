import React from 'react'
import { render } from 'react-testing-library'
import Web3message from './Web3message'

describe('Web3message', () => {
    it('default renders without crashing', () => {
        const { container } = render(<Web3message />)

        expect(container.firstChild).toBeInTheDocument()
    })
})
