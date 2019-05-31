import React from 'react'
import { render } from '@testing-library/react'
import App from './App'
import { User } from './context'
import { userMock, userMockConnected } from '../__mocks__/user-mock'

describe('App', () => {
    it('should be able to run tests', () => {
        expect(1 + 2).toEqual(3)
    })

    it('renders without crashing', () => {
        const { container } = render(
            <User.Provider value={userMockConnected}>
                <App />
            </User.Provider>
        )
        expect(container.firstChild).toBeInTheDocument()
    })

    it('renders loading state', () => {
        const { container } = render(
            <User.Provider value={{ ...userMock, isLoading: true }}>
                <App />
            </User.Provider>
        )
        expect(container.querySelector('.spinner')).toBeInTheDocument()
    })
})
