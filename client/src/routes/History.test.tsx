import React from 'react'
import { render } from 'react-testing-library'
import { User } from '../context'
import History from './History'

describe('History', () => {
    it('renders without crashing', () => {
        const { container } = render(<History />)
        expect(container.firstChild).toBeInTheDocument()
    })

    it('outputs Web3 message when no Web3 detected', () => {
        const context = {
            isLogged: false,
            isLoading: false,
            isWeb3: false,
            isOceanNetwork: false,
            account: '',
            web3: {},
            ocean: {},
            balance: { eth: 0, ocn: 0 },
            network: '',
            requestFromFaucet: () => {},
            unlockAccounts: () => {},
            message: ''
        }

        const { container } = render(
            <User.Provider value={context}>
                <History />
            </User.Provider>
        )
        expect(container.querySelector('.message')).toBeInTheDocument()
        expect(container.querySelector('.message')).toHaveTextContent(
            'Not a Web3 Browser.'
        )
    })
})
