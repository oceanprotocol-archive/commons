import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { createMemoryHistory, createLocation } from 'history'
import History from './History'

const history = createMemoryHistory()
const location = createLocation('/history')

describe('History', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <MemoryRouter>
                <History
                    history={history}
                    location={location}
                    match={{ params: '', path: '', url: '', isExact: true }}
                />
            </MemoryRouter>
        )
        expect(container.firstChild).toBeInTheDocument()
    })
})
