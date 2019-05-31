import React from 'react'
import { render } from 'react-testing-library'
import Search from './Search'
import { User } from '../context'
import { createMemoryHistory } from 'history'
import { BrowserRouter as Router } from 'react-router-dom'
import { userMockConnected } from '../../__mocks__/user-mock'

describe('Search', () => {
    it('renders without crashing', () => {
        const history = createMemoryHistory()

        const { container } = render(
            <User.Provider value={userMockConnected}>
                <Router>
                    <Search
                        location={{
                            search: '?text=Hello&page=1',
                            pathname: '/search',
                            state: '',
                            hash: ''
                        }}
                        history={history}
                    />
                </Router>
            </User.Provider>
        )
        expect(container.firstChild).toBeInTheDocument()
    })
})
