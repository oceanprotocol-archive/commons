/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { DDO } from '@oceanprotocol/squid'
import { StateMock } from '@react-mock/state'
import ReactGA from 'react-ga'
import { User, Market } from '../../../context'
import AssetFile, { messages } from './AssetFile'
import { userMockConnected } from '../../../../__mocks__/user-mock'
import { marketMock } from '../../../../__mocks__/market-mock'

const file = {
    index: 0,
    url: 'https://hello.com',
    contentType: 'application/x-zip',
    contentLength: '100'
}

const ddo = ({
    id: 'xxx',
    findServiceByType: () => {
        return { index: 'xxx' }
    }
} as any) as DDO

ReactGA.initialize('foo', { testMode: true })

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
            <User.Provider value={userMockConnected}>
                <Market.Provider value={marketMock}>
                    <AssetFile file={file} ddo={ddo} />
                </Market.Provider>
            </User.Provider>
        )
        const button = getByText('Get file')
        expect(button).not.toHaveAttribute('disabled')

        fireEvent.click(button)
    })

    it('renders feedback message: initial', async () => {
        const { container } = render(
            <StateMock state={{ isLoading: true, step: 99 }}>
                <AssetFile file={file} ddo={ddo} />
            </StateMock>
        )
        expect(container.querySelector('.spinner')).toHaveTextContent(
            messages[99]
        )
    })

    it('renders feedback message: CreatingAgreement', async () => {
        const { container } = render(
            <StateMock state={{ isLoading: true, step: 0 }}>
                <AssetFile file={file} ddo={ddo} />
            </StateMock>
        )
        expect(container.querySelector('.spinner')).toHaveTextContent(
            messages[0].replace(/<(?:.|\n)*?>/gm, '')
        )
    })

    it('renders feedback message: AgreementInitialized', async () => {
        const { container } = render(
            <StateMock state={{ isLoading: true, step: 1 }}>
                <AssetFile file={file} ddo={ddo} />
            </StateMock>
        )
        expect(container.querySelector('.spinner')).toHaveTextContent(
            messages[1].replace(/<(?:.|\n)*?>/gm, '')
        )
    })

    it('renders feedback message: LockingPayment', async () => {
        const { container } = render(
            <StateMock state={{ isLoading: true, step: 2 }}>
                <AssetFile file={file} ddo={ddo} />
            </StateMock>
        )
        expect(container.querySelector('.spinner')).toHaveTextContent(
            messages[2].replace(/<(?:.|\n)*?>/gm, '')
        )
    })

    it('renders feedback message: LockedPayment', async () => {
        const { container } = render(
            <StateMock state={{ isLoading: true, step: 3 }}>
                <AssetFile file={file} ddo={ddo} />
            </StateMock>
        )
        expect(container.querySelector('.spinner')).toHaveTextContent(
            messages[3].replace(/<(?:.|\n)*?>/gm, '')
        )
    })

    it('renders feedback message: before consume', async () => {
        const { container } = render(
            <StateMock state={{ isLoading: true, step: 4 }}>
                <AssetFile file={file} ddo={ddo} />
            </StateMock>
        )
        expect(container.querySelector('.spinner')).toHaveTextContent(
            messages[4].replace(/<(?:.|\n)*?>/gm, '')
        )
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
