import React from 'react'
import { render } from '@testing-library/react'
import Spinner from './Spinner'

describe('Spinner', () => {
    it('renders without crashing', () => {
        const { container } = render(<Spinner />)
        expect(container.firstChild).toBeInTheDocument()
    })

    it('renders small variant', () => {
        const { container } = render(<Spinner small />)
        expect(container.firstChild).toBeInTheDocument()
    })
})
