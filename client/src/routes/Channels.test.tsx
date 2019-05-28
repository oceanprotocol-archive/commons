import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render } from 'react-testing-library'
import Channels from './Channels'

describe('Channels', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <Router>
                <Channels />
            </Router>
        )
        expect(container.firstChild).toBeInTheDocument()
    })
})
