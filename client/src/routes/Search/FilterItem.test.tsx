import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import FilterItem from './FilterItem'

describe('FilterItem', () => {
    const filterByCategory = jest.fn()
    const filterByLicense = jest.fn()

    it('renders without crashing', () => {
        const { container } = render(
            <FilterItem
                isActive={false}
                filter={{ label: 'Category' }}
                filterByCategory={filterByCategory}
                filterByLicense={filterByLicense}
                option="Hello"
            />
        )
        expect(container.firstChild).toBeInTheDocument()
    })

    it('filterByCategory can be called', () => {
        const { getByText, getByTitle } = render(
            <FilterItem
                isActive
                filter={{ label: 'Category' }}
                filterByCategory={filterByCategory}
                filterByLicense={filterByLicense}
                option="Hello"
            />
        )
        fireEvent.click(getByText(/Hello/))
        expect(filterByCategory).toHaveBeenCalled()
        fireEvent.click(getByTitle('Clear'))
    })

    it('filterByLicense can be called', () => {
        const { getByText, getByTitle } = render(
            <FilterItem
                isActive
                filter={{ label: 'License' }}
                filterByCategory={filterByCategory}
                filterByLicense={filterByLicense}
                option="Hello"
            />
        )
        fireEvent.click(getByText(/Hello/))
        expect(filterByLicense).toHaveBeenCalled()
        fireEvent.click(getByTitle('Clear'))
    })
})
