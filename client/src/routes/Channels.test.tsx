import React from 'react'
import { MemoryRouter } from 'react-router'
import { render } from '@testing-library/react'
import Channels from './Channels'
import { User } from '../context'
import { userMockConnected } from '../../__mocks__/user-mock'

describe('Channels', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <User.Provider value={userMockConnected}>
                <MemoryRouter>
                    <Channels />
                </MemoryRouter>
            </User.Provider>
        )
        expect(container.firstChild).toBeInTheDocument()
    })
})
