import React from 'react'
import { render } from '@testing-library/react'
import Channel from './Channel'
import { User } from '../../context'
import { createMemoryHistory } from 'history'
import { userMockConnected } from '../../../__mocks__/user-mock'
import { MemoryRouter } from 'react-router'

describe('Channel', () => {
    it('renders without crashing', () => {
        const history = createMemoryHistory()

        const { container } = render(
            <User.Provider value={userMockConnected}>
                <MemoryRouter>
                    <Channel
                        match={{
                            params: { channel: 'ai-for-good' }
                        }}
                        history={history}
                    />
                </MemoryRouter>
            </User.Provider>
        )
        expect(container.firstChild).toBeInTheDocument()
    })
})
