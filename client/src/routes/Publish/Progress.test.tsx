import React from 'react'
import { render } from '@testing-library/react'
import Progress from './Progress'

describe('Progress', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <Progress currentStep={1} steps={[{ title: '' }]} />
        )
        expect(container.firstChild).toBeInTheDocument()
    })

    it('renders completed state', () => {
        const { container } = render(
            <Progress currentStep={2} steps={[{ title: '' }]} />
        )
        expect(container.querySelector('li')).toHaveClass('completed')
    })
})
