import React from 'react'
import { render } from 'react-testing-library'
import Channel from './Channel'
import { User } from '../../context'
import { createMemoryHistory } from 'history'
import { userMockConnected } from '../../../__mocks__/user-mock'

describe('Channel', () => {
    it('renders without crashing', () => {
        const history = createMemoryHistory()

        const { container } = render(
            <User.Provider value={userMockConnected}>
                <Channel
                    match={{
                        params: { channel: 'ai-for-good' }
                    }}
                    history={history}
                />
            </User.Provider>
        )
        expect(container.firstChild).toBeInTheDocument()
    })
})
