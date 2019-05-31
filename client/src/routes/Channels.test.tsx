import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render } from 'react-testing-library'
import Channels from './Channels'
import { User } from '../context'
import { userMockConnected } from '../../__mocks__/user-mock'

describe('Channels', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <User.Provider value={userMockConnected}>
                <Router>
                    <Channels />
                </Router>
            </User.Provider>
        )
        expect(container.firstChild).toBeInTheDocument()
    })
})
