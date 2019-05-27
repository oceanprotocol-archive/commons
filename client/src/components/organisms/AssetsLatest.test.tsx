import React from 'react'
import { render } from 'react-testing-library'
import AssetsLatest from './AssetsLatest'
import { BrowserRouter } from 'react-router-dom'

describe('AssetsLatest', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <BrowserRouter>
                <AssetsLatest />
            </BrowserRouter>
        )
        expect(container.firstChild).toBeInTheDocument()
    })
})
