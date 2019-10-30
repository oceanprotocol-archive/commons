import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { createMemoryHistory, createLocation } from 'history'
import Faucet from '.'
import { User, Market } from '../../context'
import { userMockConnected } from '../../../__mocks__/user-mock'

const history = createMemoryHistory()
const location = createLocation('/faucet')

const setup = () => {
    const utils = render(
        <User.Provider value={userMockConnected}>
            <Market.Provider
                value={{
                    network: 'pacific',
                    totalAssets: 100,
                    categories: [''],
                    networkMatch: true
                }}
            >
                <MemoryRouter>
                    <Faucet
                        history={history}
                        location={location}
                        match={{ params: '', path: '', url: '', isExact: true }}
                    />
                </MemoryRouter>
            </Market.Provider>
        </User.Provider>
    )
    const button = utils.getByText('Request ETH')
    const { container } = utils
    return { button, container, ...utils }
}

describe('Faucet', () => {
    it('renders without crashing', () => {
        const { container } = setup()
        expect(container.firstChild).toBeInTheDocument()
    })

    it('shows actions when connected', () => {
        const { button } = setup()
        expect(button).toBeInTheDocument()
        expect(button).not.toHaveAttribute('disabled')
    })

    it('fires requestFromFaucet', async () => {
        await act(async () => {
            const { button } = setup()
            fireEvent.click(button)
        })
        expect(userMockConnected.requestFromFaucet).toHaveBeenCalledTimes(1)
    })
})
