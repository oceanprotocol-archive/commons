import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Search from './Search'

describe('Search', () => {
    it('renders without crashing', () => {
        const { container } = render(<Search searchAssets={() => null} />)
        expect(container.firstChild).toBeInTheDocument()
        // type search query
        fireEvent.change(container.querySelector('input'), {
            target: { value: 'Plants' }
        })
        expect(container.querySelector('input').value).toBe('Plants')
        // fireEvent.click(getByText('Search'))
    })
})
