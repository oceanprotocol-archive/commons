import React from 'react'
import { render } from '@testing-library/react'
import ChannelTeaser from './ChannelTeaser'
import { BrowserRouter } from 'react-router-dom'
import { User } from '../../context'
import { userMockConnected } from '../../../__mocks__/user-mock'

describe('ChannelTeaser', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <User.Provider value={userMockConnected}>
                <BrowserRouter>
                    <ChannelTeaser channel="ai-for-good" />
                </BrowserRouter>
            </User.Provider>
        )
        expect(container.firstChild).toBeInTheDocument()
    })
})
