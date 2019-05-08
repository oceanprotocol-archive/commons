import React from 'react'
import { render } from 'react-testing-library'
import InputGroup from './InputGroup'

describe('InputGroup', () => {
    it('renders without crashing', () => {
        const { container } = render(<InputGroup>Hello</InputGroup>)
        expect(container.firstChild).toBeInTheDocument()
    })
})
