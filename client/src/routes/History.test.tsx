import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import History from './History'

describe('History', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <MemoryRouter>
                <History />
            </MemoryRouter>
        )
        expect(container.firstChild).toBeInTheDocument()
    })
})
