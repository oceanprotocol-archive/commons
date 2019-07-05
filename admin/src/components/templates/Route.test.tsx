import React from 'react'
import { render } from '@testing-library/react'
import Route from './Route'
import { BrowserRouter as Router } from 'react-router-dom'

describe('Route', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <Router>
                <Route title="Hello Title">Hello</Route>
            </Router>
        )
        expect(container.firstChild).toBeInTheDocument()
    })

    it('renders title & description', () => {
        const { container } = render(
            <Router>
                <Route title="Hello Title" description="Hello Description">
                    Hello
                </Route>
            </Router>
        )
        expect(container.querySelector('.title')).toHaveTextContent(
            'Hello Title'
        )
        expect(container.querySelector('.description')).toHaveTextContent(
            'Hello Description'
        )
    })
})
