import React from 'react'
import { render } from 'react-testing-library'
import Channel from './Channel'
import { User } from '../../context'
import { createMemoryHistory } from 'history'

describe('Channel', () => {
    it('renders without crashing', () => {
        const history = createMemoryHistory()

        const { container } = render(
            <User.Provider
                value={{
                    isLogged: false,
                    isLoading: false,
                    isWeb3: false,
                    isOceanNetwork: false,
                    account: '',
                    web3: {},
                    ocean: {
                        aquarius: {
                            queryMetadata: () => {
                                return {
                                    results: [],
                                    totalResults: 1,
                                    totalPages: 1
                                }
                            }
                        }
                    },
                    balance: { eth: 0, ocn: 0 },
                    network: '',
                    requestFromFaucet: () => {},
                    unlockAccounts: () => {},
                    message: ''
                }}
            >
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
