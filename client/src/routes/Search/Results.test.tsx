import React from 'react'
import { render } from '@testing-library/react'
import Results from './Results'
import { User } from '../../context'
import { userMockConnected } from '../../../__mocks__/user-mock'
import {
    results,
    totalResults,
    totalPages,
    currentPage
} from '../../../__fixtures__/search.json'

describe('Results', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <User.Provider value={userMockConnected}>
                <Results
                    results={results}
                    totalResults={totalResults}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    handlePageClick={jest.fn()}
                />
            </User.Provider>
        )
        expect(container.firstChild).toBeInTheDocument()
    })
})
