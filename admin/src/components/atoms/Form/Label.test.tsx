import React from 'react'
import { render } from '@testing-library/react'
import Label from './Label'

describe('Label', () => {
    it('renders without crashing', () => {
        const { container } = render(<Label htmlFor="hello">Hello</Label>)
        expect(container.firstChild).toBeInTheDocument()
    })

    it('renders required state', () => {
        const { container } = render(
            <Label required htmlFor="hello">
                Hello
            </Label>
        )
        expect(container.firstChild).toHaveAttribute('title', 'Required')
        expect(container.firstChild).toHaveClass('required')
    })
})
