import React from 'react'
import { render } from '@testing-library/react'
import { createMemoryHistory, createLocation } from 'history'
import NotFound from './NotFound'
import { MemoryRouter } from 'react-router'

const history = createMemoryHistory()
const location = createLocation('/whatever')

describe('NotFound', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <MemoryRouter>
                <NotFound
                    history={history}
                    location={location}
                    match={{ params: '', path: '', url: '', isExact: true }}
                />
            </MemoryRouter>
        )
        expect(container.firstChild).toBeInTheDocument()
    })
})
