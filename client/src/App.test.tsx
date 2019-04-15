import React from 'react'
import { render } from 'react-testing-library'
import App from './App'

describe('App', () => {
    it('renders without crashing', () => {
        const { container } = render(<App />)
        expect(container.firstChild).toBeInTheDocument()
    })
})
