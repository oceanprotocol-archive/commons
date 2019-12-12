import React from 'react'
import { render } from '@testing-library/react'
import { User } from '../context'
import UserProvider from './UserProvider'

describe('UserProvider', () => {
    it('renders without crashing', () => {
        const { getByTestId } = render(
            <UserProvider>
                <User.Consumer>
                    {user => <div data-testid="hello">{user.account}</div>}
                </User.Consumer>
            </UserProvider>
        )
        expect(getByTestId('hello')).toBeInTheDocument()
    })
})
