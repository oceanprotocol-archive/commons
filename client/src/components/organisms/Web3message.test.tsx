import React from 'react'
import { render } from '@testing-library/react'
import Web3message from './Web3message'
import { User, Market } from '../../context'
import { userMock, userMockConnected } from '../../../__mocks__/user-mock'
import { marketMock } from '../../../__mocks__/market-mock'

describe('Web3message', () => {
    it('renders with burner wallet message', () => {
        const { container } = render(
            <User.Provider value={{ ...userMockConnected, isBurner: true }}>
                <Market.Provider value={{ ...marketMock }}>
                    <Web3message extended />
                </Market.Provider>
            </User.Provider>
        )
        expect(container.firstChild).toHaveTextContent('Burner Wallet')
    })

    it('renders with wrongNetwork message', () => {
        const { container } = render(
            <User.Provider value={{ ...userMockConnected, network: 'Pacific' }}>
                <Market.Provider
                    value={{
                        ...marketMock,
                        networkMatch: false,
                        network: 'Nile'
                    }}
                >
                    <Web3message extended />
                </Market.Provider>
            </User.Provider>
        )
        expect(container.firstChild).toHaveTextContent(
            'Not connected to Nile network'
        )
    })

    it('renders with noAccount message', () => {
        const { container } = render(
            <User.Provider value={userMock}>
                <Market.Provider value={marketMock}>
                    <Web3message extended />
                </Market.Provider>
            </User.Provider>
        )
        expect(container.firstChild).toHaveTextContent('No account selected')
    })

    it('renders with hasAccount message', () => {
        const { container } = render(
            <User.Provider value={userMockConnected}>
                <Market.Provider value={marketMock}>
                    <Web3message />
                </Market.Provider>
            </User.Provider>
        )
        expect(container.firstChild).toHaveTextContent('0xxxxxx')
    })
})
