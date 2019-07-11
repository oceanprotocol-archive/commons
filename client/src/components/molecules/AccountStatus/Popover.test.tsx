import React from 'react'
import { render } from '@testing-library/react'
import Popover from './Popover'
import { userMock, userMockConnected } from '../../../../__mocks__/user-mock'
import { User } from '../../../context'

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
            <User.Provider value={{ ...userMockConnected, network: 'Nile' }}>
                <Popover forwardedRef={() => null} style={{}} />
            </User.Provider>
        )
        expect(container.firstChild).toBeInTheDocument()
        expect(container.firstChild).toHaveTextContent('Connected to Nile')
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
