import React from 'react'
import { render } from 'react-testing-library'
import Search from './Search'
import { User } from '../context'
import { createMemoryHistory } from 'history'

describe('Search', () => {
    it('renders without crashing', () => {
        const history = createMemoryHistory()

        const { container } = render(
            <User.Provider
                value={{
                    isLogged: false,
                    isLoading: false,
                    isWeb3: false,
                    isCorrectNetwork: false,
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
                <Search
                    location={{
                        search: '?text=Hello&page=1',
                        pathname: '/search',
                        state: '',
                        hash: ''
                    }}
                    history={history}
                />
            </User.Provider>
        )
        expect(container.firstChild).toBeInTheDocument()
    })
})
