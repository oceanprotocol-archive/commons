import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { toDataUrl } from 'ethereum-blockies'
import Account from './Account'
import { User } from '../../context'
import { userMockConnected } from '../../../__mocks__/user-mock'

describe('Account', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <User.Provider
                value={{ ...userMockConnected, account: '0xxxxxxxxxxxxxxx' }}
            >
                <Account />
            </User.Provider>
        )
        expect(container.firstChild).toBeInTheDocument()
    })

    it('outputs empty state without account', () => {
        const { container, getByText } = render(
            <User.Provider value={{ ...userMockConnected, account: '' }}>
                <Account />
            </User.Provider>
        )
        expect(container.firstChild).toHaveTextContent('No account selected')
        fireEvent.click(getByText('Unlock Account'))
    })

    it('outputs blockie img', () => {
        const account = '0xxxxxxxxxxxxxxx'
        const blockies = toDataUrl(account)

        const { container } = render(
            <User.Provider value={{ ...userMockConnected, account }}>
                <Account />
            </User.Provider>
        )
        expect(container.querySelector('.blockies')).toBeInTheDocument()
        expect(container.querySelector('.blockies')).toHaveAttribute(
            'src',
            blockies
        )
    })

    it('Account info can be toggled', () => {
        const { container, getByText } = render(
            <User.Provider
                value={{
                    ...userMockConnected,
                    isBurner: true,
                    account: '0xxxxxxxxxxxxxxx'
                }}
            >
                <Account />
            </User.Provider>
        )
        expect(container.firstChild).toBeInTheDocument()
        fireEvent.click(getByText('Burner Wallet'))
    })
})
