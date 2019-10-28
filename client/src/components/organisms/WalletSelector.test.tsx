import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import ReactModal from 'react-modal'
import WalletSelector from './WalletSelector'
import { User, Market } from '../../context'
import { userMockConnected } from '../../../__mocks__/user-mock'
import { marketMock } from '../../../__mocks__/market-mock'

describe('WalletSelector', () => {
    it('renders without crashing', () => {
        ReactModal.setAppElement(document.createElement('div'))

        const { container, getByText } = render(
            <User.Provider value={userMockConnected}>
                <Market.Provider value={marketMock}>
                    <WalletSelector />
                </Market.Provider>
            </User.Provider>
        )
        expect(container.firstChild).toBeInTheDocument()
        fireEvent.click(getByText('Select wallet'))

        const burnerButton = getByText('Burner Wallet')
        fireEvent.click(burnerButton)

        fireEvent.click(getByText('Select wallet'))
        // const metamaskButton = getByText('MetaMask')
        // fireEvent.click(metamaskButton)
    })
})
