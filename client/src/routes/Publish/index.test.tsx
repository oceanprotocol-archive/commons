import React from 'react'
import { render } from '@testing-library/react'
import Publish from '.'

describe('Progress', () => {
    it('renders without crashing', () => {
        const { container, getByText } = render(<Publish />)
        expect(container.firstChild).toBeInTheDocument()
        expect(getByText('Next →')).toHaveAttribute('disabled')
    })
})
