import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import Routes from './Routes'
import { User } from './context'
import { userMockConnected } from '../__mocks__/user-mock'

describe('Routes', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <User.Provider value={userMockConnected}>
                <Router>
                    <Routes />
                </Router>
            </User.Provider>
        )
        expect(container.firstChild).toBeInTheDocument()
    })
})
