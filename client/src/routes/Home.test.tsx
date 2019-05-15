import React from 'react'
import { Router } from 'react-router'
import { createBrowserHistory } from 'history'
import { render } from 'react-testing-library'
import Home from './Home'

const history = createBrowserHistory()

describe('Home', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <Router history={history}>
                <Home history={history} />
            </Router>
        )
        expect(container.firstChild).toBeInTheDocument()
    })
})
