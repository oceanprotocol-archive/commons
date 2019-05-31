import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import AssetsLatest from './AssetsLatest'
import { User } from '../../context'
import { userMockConnected } from '../../../__mocks__/user-mock'

describe('AssetsLatest', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <User.Provider value={userMockConnected}>
                <BrowserRouter>
                    <AssetsLatest />
                </BrowserRouter>
            </User.Provider>
        )
        expect(container.firstChild).toBeInTheDocument()
    })
})
