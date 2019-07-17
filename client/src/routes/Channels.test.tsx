import React from 'react'
import { MemoryRouter } from 'react-router'
import { createMemoryHistory, createLocation } from 'history'
import { render } from '@testing-library/react'
import Channels from './Channels'
import { User } from '../context'
import { userMockConnected } from '../../__mocks__/user-mock'

const history = createMemoryHistory()
const location = createLocation('/channels')

describe('Channels', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <User.Provider value={userMockConnected}>
                <MemoryRouter>
                    <Channels
                        history={history}
                        location={location}
                        match={{ params: '', path: '', url: '', isExact: true }}
                    />
                </MemoryRouter>
            </User.Provider>
        )
        expect(container.firstChild).toBeInTheDocument()
    })
})
