import React from 'react'
import { render } from '@testing-library/react'
import Row from './Row'

describe('Row', () => {
    it('renders without crashing', () => {
        const { container } = render(<Row>Hello</Row>)
        expect(container.firstChild).toBeInTheDocument()
    })
})
