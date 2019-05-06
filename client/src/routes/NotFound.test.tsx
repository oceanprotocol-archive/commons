import React from 'react'
import { render } from 'react-testing-library'
import NotFound from './NotFound'

describe('NotFound', () => {
    it('renders without crashing', () => {
        const { container } = render(<NotFound />)
        expect(container.firstChild).toBeInTheDocument()
    })
})
