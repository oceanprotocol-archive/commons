import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import Web3message from './Web3message'
import { User } from '../../context'
import { userMock, userMockConnected } from '../../../__mocks__/user-mock'

describe('Web3message', () => {
    it('renders with noWeb3 message', () => {
        const { container } = render(
            <User.Provider value={{ ...userMock }}>
                <Web3message />
            </User.Provider>
        )
        expect(container.firstChild).toHaveTextContent('Not a Web3 Browser')
    })

    it('renders with wrongNetwork message', () => {
        const { container } = render(
            <User.Provider value={{ ...userMock, isWeb3: true }}>
                <Web3message />
            </User.Provider>
        )
        expect(container.firstChild).toHaveTextContent(
            'Not connected to Nile network'
        )
    })

    it('renders with noAccount message', () => {
        const { container } = render(
            <User.Provider
                value={{ ...userMock, isWeb3: true, isCorrectNetwork: true }}
            >
                <Web3message />
            </User.Provider>
        )
        expect(container.firstChild).toHaveTextContent('No accounts detected')
    })

    it('renders with hasAccount message', () => {
        const { container } = render(
            <User.Provider value={userMockConnected}>
                <Web3message />
            </User.Provider>
        )
        expect(container.firstChild).toHaveTextContent('0xxxxxx')
    })

    it('button click fires unlockAccounts', () => {
        const { getByText } = render(
            <User.Provider
                value={{
                    ...userMock,
                    isWeb3: true,
                    isCorrectNetwork: true
                }}
            >
                <Web3message />
            </User.Provider>
        )

        fireEvent.click(getByText('Unlock Account'))
        expect(userMock.unlockAccounts).toBeCalled()
    })
})
