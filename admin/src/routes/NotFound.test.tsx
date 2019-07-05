import React from 'react'
import { render } from '@testing-library/react'
import NotFound from './NotFound'
import { MemoryRouter } from 'react-router'

describe('NotFound', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <MemoryRouter>
                <NotFound />
            </MemoryRouter>
        )
        expect(container.firstChild).toBeInTheDocument()
    })
})
