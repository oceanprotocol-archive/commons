/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import { DDO } from '@oceanprotocol/squid'
import { StateMock } from '@react-mock/state'
import { User } from '../../context'
import AssetFile from './AssetFile'

const file = {
    index: 0,
    url: 'https://hello.com',
    contentType: 'zip',
    contentLength: 100
}

const ddo = ({ id: 'xxx' } as any) as DDO

const contextConnectedMock = {
    isLogged: true,
    isLoading: false,
    isWeb3: true,
    isCorrectNetwork: true,
    account: '',
    web3: {},
    ocean: {},
    balance: { eth: 0, ocn: 0 },
    network: '',
    requestFromFaucet: () => {},
    unlockAccounts: () => {},
    message: ''
}

describe('AssetFile', () => {
    it('renders without crashing', () => {
        const { container } = render(<AssetFile file={file} ddo={ddo} />)
        expect(container.firstChild).toBeInTheDocument()
    })

    it('button to be disabled when not connected', () => {
        const { container } = render(<AssetFile file={file} ddo={ddo} />)
        expect(container.querySelector('button')).toHaveAttribute('disabled')
    })

    it('button to be enabled when connected', async () => {
        const { getByText } = render(
            <User.Provider value={contextConnectedMock}>
                <AssetFile file={file} ddo={ddo} />
            </User.Provider>
        )
        const button = getByText('Get file')
        expect(button).not.toHaveAttribute('disabled')

        fireEvent.click(button)
    })

    it('renders loading state', async () => {
        const { container } = render(
            <StateMock state={{ isLoading: true }}>
                <AssetFile file={file} ddo={ddo} />
            </StateMock>
        )
        expect(container.querySelector('.spinner')).toBeInTheDocument()
    })

    it('renders error', async () => {
        const { container } = render(
            <StateMock state={{ error: 'Hello Error' }}>
                <AssetFile file={file} ddo={ddo} />
            </StateMock>
        )
        expect(container.querySelector('.error')).toBeInTheDocument()
        expect(container.querySelector('.error')).toHaveTextContent(
            'Hello Error'
        )
    })
})
