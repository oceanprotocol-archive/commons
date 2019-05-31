import React from 'react'
import { render } from '@testing-library/react'
import Route from './Route'

describe('Route', () => {
    it('renders without crashing', () => {
        const { container } = render(<Route title="Hello Title">Hello</Route>)
        expect(container.firstChild).toBeInTheDocument()
    })

    it('renders title & description', () => {
        const { container } = render(
            <Route title="Hello Title" description="Hello Description">
                Hello
            </Route>
        )
        expect(container.querySelector('.title')).toHaveTextContent(
            'Hello Title'
        )
        expect(container.querySelector('.description')).toHaveTextContent(
            'Hello Description'
        )
    })
})
