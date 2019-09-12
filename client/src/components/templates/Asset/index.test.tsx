import React from 'react'
import { render } from '@testing-library/react'
import { createMemoryHistory, createLocation } from 'history'
import Details from './index'

const history = createMemoryHistory()
const location = createLocation('/asset/did:xxx')

describe('Details', () => {
    it('renders loading state by default', () => {
        const { container } = render(
            <Details
                history={history}
                location={location}
                match={{ params: '', path: '', url: '', isExact: true }}
            />
        )
        expect(container.firstChild).toBeInTheDocument()
    })
})
