import React from 'react'
import { render } from '@testing-library/react'
import { User } from '../../context'
import { userMockConnected } from '../../__mocks__/user-mock'
import searchMock from '../../__fixtures__/search.json'
import Sidebar from './Sidebar'

describe('Sidebar', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <User.Provider value={userMockConnected}>
                <Sidebar
                    category="Architecture"
                    license="Public"
                    results={searchMock.results}
                    filterByCategory={() => null}
                    filterByLicense={() => null}
                />
            </User.Provider>
        )
        expect(container.firstChild).toBeInTheDocument()
    })
})
