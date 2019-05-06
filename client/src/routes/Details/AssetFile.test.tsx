/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import { DDO } from '@oceanprotocol/squid'
import { StateMock } from '@react-mock/state'
import ReactGA from 'react-ga'
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
    isOceanNetwork: true,
    account: '',
    web3: {},
    ocean: {},
    balance: { eth: 0, ocn: 0 },
    network: '',
    requestFromFaucet: () => {},
    unlockAccounts: () => {},
    message: ''
}

ReactGA.initialize('foo', { testMode: true })

describe('AssetFile', () => {
    const Component = <AssetFile file={file} ddo={ddo} />

    it('renders without crashing', () => {
        const { container } = render(Component)
        expect(container.firstChild).toBeInTheDocument()
    })

    it('button to be disabled when not connected', () => {
        const { container } = render(Component)
        expect(container.querySelector('button')).toHaveAttribute('disabled')
    })

    it('button to be enabled when connected', async () => {
        const { getByText } = render(
            <User.Provider value={contextConnectedMock}>
                {Component}
            </User.Provider>
        )
        const button = getByText('Get file')
        expect(button).not.toHaveAttribute('disabled')
    })

    it('renders loading state', async () => {
        const { container } = render(
            <StateMock state={{ isLoading: true }}>{Component}</StateMock>
        )
        expect(container.querySelector('.spinner')).toBeInTheDocument()
    })

    it('renders error', async () => {
        const { container } = render(
            <StateMock state={{ error: 'Hello Error' }}>{Component}</StateMock>
        )
        expect(container.querySelector('.error')).toBeInTheDocument()
        expect(container.querySelector('.error')).toHaveTextContent(
            'Hello Error'
        )
    })
})
