import React from 'react'
import { render } from 'react-testing-library'
import Styleguide from './Styleguide'

describe('Styleguide', () => {
    it('renders without crashing', () => {
        const { container } = render(<Styleguide />)
        expect(container.firstChild).toBeInTheDocument()
    })
})
