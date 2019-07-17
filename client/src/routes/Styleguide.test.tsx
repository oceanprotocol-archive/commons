import React from 'react'
import { render } from '@testing-library/react'
import Styleguide from './Styleguide'
import { MemoryRouter } from 'react-router'
import { createMemoryHistory, createLocation } from 'history'

const history = createMemoryHistory()
const location = createLocation('/styleguide')

describe('Styleguide', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <MemoryRouter>
                <Styleguide
                    history={history}
                    location={location}
                    match={{ params: '', path: '', url: '', isExact: true }}
                />
            </MemoryRouter>
        )
        expect(container.firstChild).toBeInTheDocument()
    })
})
