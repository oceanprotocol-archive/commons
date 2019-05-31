import React from 'react'
import { render } from '@testing-library/react'
import Styleguide from './Styleguide'

describe('Styleguide', () => {
    it('renders without crashing', () => {
        const { container } = render(<Styleguide />)
        expect(container.firstChild).toBeInTheDocument()
    })
})
