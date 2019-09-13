import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import FilterItem from './FilterItem'

describe('FilterItem', () => {
    const setCategory = jest.fn()
    const setLicense = jest.fn()

    it('renders without crashing', () => {
        const { container } = render(
            <FilterItem
                isActive={false}
                filter={{ label: 'Category' }}
                setCategory={setCategory}
                setLicense={setLicense}
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
                setCategory={setCategory}
                setLicense={setLicense}
                option="Hello"
            />
        )
        fireEvent.click(getByText(/Hello/))
        expect(setCategory).toHaveBeenCalled()
        fireEvent.click(getByTitle('Clear'))
    })

    it('filterByLicense can be called', () => {
        const { getByText, getByTitle } = render(
            <FilterItem
                isActive
                filter={{ label: 'License' }}
                setCategory={setCategory}
                setLicense={setLicense}
                option="Hello"
            />
        )
        fireEvent.click(getByText(/Hello/))
        expect(setLicense).toHaveBeenCalled()
        fireEvent.click(getByTitle('Clear'))
    })
})
