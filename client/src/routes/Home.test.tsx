import React from 'react'
import { render } from 'react-testing-library'
import Home from './Home'

describe('Home', () => {
    it('renders without crashing', () => {
        const { container } = render(<Home history={''} />)
        expect(container.firstChild).toBeInTheDocument()
    })
})
