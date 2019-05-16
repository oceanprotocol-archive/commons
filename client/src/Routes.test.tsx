import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render } from 'react-testing-library'
import Routes from './Routes'

describe('Routes', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <Router>
                <Routes />
            </Router>
        )
        expect(container.firstChild).toBeInTheDocument()
    })
})
