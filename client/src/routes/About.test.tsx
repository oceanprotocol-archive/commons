import React from 'react'
import { render } from 'react-testing-library'
import About from './About'

describe('About', () => {
    it('renders without crashing', () => {
        const { container } = render(<About />)
        expect(container.firstChild).toBeInTheDocument()
    })
})
