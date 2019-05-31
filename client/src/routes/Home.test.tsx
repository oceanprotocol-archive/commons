import React from 'react'
import { Router } from 'react-router'
import { createBrowserHistory } from 'history'
import { render } from '@testing-library/react'
import Home from './Home'
import { userMock } from '../../__mocks__/user-mock'
import { User } from '../context'

const history = createBrowserHistory()

describe('Home', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <User.Provider value={{ ...userMock }}>
                <Router history={history}>
                    <Home history={history} />
                </Router>
            </User.Provider>
        )
        expect(container.firstChild).toBeInTheDocument()
    })
})
