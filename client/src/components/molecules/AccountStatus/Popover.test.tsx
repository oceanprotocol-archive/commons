import React from 'react'
import { render } from '@testing-library/react'
import Popover from './Popover'
import { userMock, userMockConnected } from '../../../../__mocks__/user-mock'
import { marketMock } from '../../../../__mocks__/market-mock'
import { User, Market } from '../../../context'

describe('Popover', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <User.Provider value={userMock}>
                <Popover forwardedRef={() => null} style={{}} />
            </User.Provider>
        )
        expect(container.firstChild).toBeInTheDocument()
    })

    it('renders connected without crashing', () => {
        const { container } = render(
            <User.Provider value={userMockConnected}>
                <Popover forwardedRef={() => null} style={{}} />
            </User.Provider>
        )
        expect(container.firstChild).toBeInTheDocument()
    })

    it('renders correct network', () => {
        const { container } = render(
            <User.Provider value={{ ...userMockConnected, network: 'Pacific' }}>
                <Market.Provider value={{ ...marketMock }}>
                    <Popover forwardedRef={() => null} style={{}} />
                </Market.Provider>
            </User.Provider>
        )
        expect(container.firstChild).toBeInTheDocument()
        expect(container.firstChild).toHaveTextContent('Connected to Pacific')
    })

    it('renders with wrong network', () => {
        const { container } = render(
            <User.Provider
                value={{
                    ...userMockConnected,
                    network: '1'
                }}
            >
                <Popover forwardedRef={() => null} style={{}} />
            </User.Provider>
        )
        expect(container.firstChild).toBeInTheDocument()
        expect(container.firstChild).toHaveTextContent(
            'Please connect to Custom RPC'
        )
    })
})
