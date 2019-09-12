import React from 'react'
import { render } from '@testing-library/react'
import { User } from '../../context'
import { userMockConnected } from '../../../__mocks__/user-mock'
import Filters from './Filters'

describe('Filters', () => {
    it('renders without crashing', () => {
        const { debug, container } = render(
            <User.Provider value={userMockConnected}>
                <Filters
                    category="Architecture"
                    license="Public"
                    results={[]}
                    filterByCategory={() => null}
                    filterByLicense={() => null}
                />
            </User.Provider>
        )
        expect(container.firstChild).toBeInTheDocument()
    })
})
