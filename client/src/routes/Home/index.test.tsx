import React from 'react'
import { Router } from 'react-router'
import { createMemoryHistory, createLocation } from 'history'
import { render } from '@testing-library/react'
import Home from '.'
import { userMock } from '../../../__mocks__/user-mock'
import { User } from '../../context'

const history = createMemoryHistory()
const location = createLocation('/')

describe('Home', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <User.Provider value={{ ...userMock }}>
                <Router history={history}>
                    <Home
                        history={history}
                        location={location}
                        match={{ params: '', path: '', url: '', isExact: true }}
                    />
                </Router>
            </User.Provider>
        )
        expect(container.firstChild).toBeInTheDocument()
    })
})
