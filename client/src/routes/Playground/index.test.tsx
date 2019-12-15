import React from 'react'
import { MemoryRouter } from 'react-router'
import { createMemoryHistory, createLocation } from 'history'
import { render } from '@testing-library/react'
import Playground from './index'
import { User } from '../context'
import { userMockConnected } from '../../__mocks__/user-mock'

const history = createMemoryHistory()
const location = createLocation('/playground')

describe('Playground', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <User.Provider value={userMockConnected}>
                <MemoryRouter>
                    <Playground
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
