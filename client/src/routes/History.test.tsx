import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { User } from '../context'
import History from './History'
import { userMock } from '../../__mocks__/user-mock'

describe('History', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <MemoryRouter>
                <History />
            </MemoryRouter>
        )
        expect(container.firstChild).toBeInTheDocument()
    })

    it('outputs no wallet selected', () => {

        const { container } = render(
            <User.Provider value={{ ...userMock, isOceanNetwork: true }}>
                <MemoryRouter>
                    <History />
                </MemoryRouter>
            </User.Provider>
        )
        expect(container.querySelector('.message')).toBeInTheDocument()
        expect(container.querySelector('.message')).toHaveTextContent(
            'No wallet selected.'
        )
    })
})
