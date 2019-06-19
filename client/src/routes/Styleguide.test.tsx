import React from 'react'
import { render } from '@testing-library/react'
import Styleguide from './Styleguide'
import { MemoryRouter } from 'react-router'

describe('Styleguide', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <MemoryRouter>
                <Styleguide />
            </MemoryRouter>
        )
        expect(container.firstChild).toBeInTheDocument()
    })
})
