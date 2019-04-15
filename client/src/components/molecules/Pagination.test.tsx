import React from 'react'
import { render } from 'react-testing-library'
import Pagination from './Pagination'

describe('Button', () => {
    it('renders without crashing', () => {
        const { container, getByRole } = render(
            <Pagination
                totalPages={20}
                currentPage={1}
                handlePageClick={() => Promise.resolve()}
            />
        )
        expect(container.firstChild).toBeInTheDocument()
    })
})
