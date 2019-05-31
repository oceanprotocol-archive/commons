import React from 'react'
import { render } from '@testing-library/react'
import About from './About'

describe('About', () => {
    it('renders without crashing', () => {
        const { container } = render(<About />)
        expect(container.firstChild).toBeInTheDocument()
    })
})
