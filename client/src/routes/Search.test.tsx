import React from 'react'
import { render } from '@testing-library/react'
import Search from './Search'
import { User } from '../context'
import { createMemoryHistory } from 'history'
import { BrowserRouter as Router } from 'react-router-dom'
import { userMockConnected } from '../../__mocks__/user-mock'

const history = createMemoryHistory()

describe('Search', () => {
    it('renders without crashing', () => {
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
                        match={{ params: '', path: '', url: '', isExact: true }}
                    />
                </Router>
            </User.Provider>
        )
        expect(container.firstChild).toBeInTheDocument()
    })
})
