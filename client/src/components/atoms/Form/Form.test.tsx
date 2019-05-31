import React from 'react'
import { render } from '@testing-library/react'
import Form from './Form'

describe('Form', () => {
    it('renders without crashing', () => {
        const { container } = render(<Form>Hello</Form>)
        expect(container.firstChild).toBeInTheDocument()
    })

    it('renders title & description when set', () => {
        const { container } = render(
            <Form title="Hello Title" description="Hello Description">
                Hello
            </Form>
        )
        expect(container.querySelector('.formTitle')).toHaveTextContent(
            'Hello Title'
        )
        expect(container.querySelector('.formDescription')).toHaveTextContent(
            'Hello Description'
        )
    })

    it('can switch to minimal', () => {
        const { container } = render(<Form minimal>Hello</Form>)
        expect(container.firstChild).toHaveClass('formMinimal')
    })
})
