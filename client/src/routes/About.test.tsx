import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import About from './About'

describe('About', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <MemoryRouter>
                <About />
            </MemoryRouter>
        )
        expect(container.firstChild).toBeInTheDocument()
    })
})
