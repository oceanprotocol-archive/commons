import React from 'react'
import { render } from '@testing-library/react'
import Web3message from './Web3message'
import { User } from '../../context'
import { userMock, userMockConnected } from '../../../__mocks__/user-mock'

describe('Web3message', () => {
    it('renders with burner wallet message', () => {
        const { container } = render(
            <User.Provider value={{ ...userMockConnected, isBurner: true }}>
                <Web3message extended />
            </User.Provider>
        )
        expect(container.firstChild).toHaveTextContent('Burner Wallet')
    })

    it('renders with wrongNetwork message', () => {
        const { container } = render(
            <User.Provider value={{ ...userMockConnected }}>
                <Web3message extended />
            </User.Provider>
        )
        expect(container.firstChild).toHaveTextContent(
            'Not connected to Pacific network'
        )
    })

    it('renders with noAccount message', () => {
        const { container } = render(
            <User.Provider value={{ ...userMock }}>
                <Web3message extended />
            </User.Provider>
        )
        expect(container.firstChild).toHaveTextContent('No wallet selected.')
    })

    it('renders with hasAccount message', () => {
        const { container } = render(
            <User.Provider value={userMockConnected}>
                <Web3message />
            </User.Provider>
        )
        expect(container.firstChild).toHaveTextContent('0xxxxxx')
    })
})
