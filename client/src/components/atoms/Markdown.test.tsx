import React from 'react'
import { render } from 'react-testing-library'
import Markdown from './Markdown'

describe('Markdown', () => {
    it('renders without crashing', () => {
        const { container } = render(<Markdown text={'#hello'} />)
        expect(container.firstChild).toBeInTheDocument()
    })
})
