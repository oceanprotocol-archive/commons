import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { createMemoryHistory, createLocation } from 'history'
import About from './About'

const history = createMemoryHistory()
const location = createLocation('/about')

describe('About', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <MemoryRouter>
                <About
                    history={history}
                    location={location}
                    match={{ params: '', path: '', url: '', isExact: true }}
                />
            </MemoryRouter>
        )
        expect(container.firstChild).toBeInTheDocument()
    })
})
