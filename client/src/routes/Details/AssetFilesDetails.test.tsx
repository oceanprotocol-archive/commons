/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react'
import { render } from 'react-testing-library'
import { DDO } from '@oceanprotocol/squid'
import AssetFilesDetails from './AssetFilesDetails'
import { User } from '../../context'
import { userMockConnected } from '../../../__mocks__/user-mock'

describe('AssetFilesDetails', () => {
    it('renders without crashing', () => {
        const files = [
            {
                index: 0,
                url: 'https://hello.com'
            }
        ]

        const { container } = render(
            <AssetFilesDetails files={files} ddo={({} as any) as DDO} />
        )
        expect(container.firstChild).toBeInTheDocument()
    })

    it('renders nothing when no files', () => {
        const { container } = render(
            <AssetFilesDetails files={[]} ddo={({} as any) as DDO} />
        )
        expect(container.firstChild).toHaveTextContent('No files attached.')
    })

    it('hides Web3message when all connected', () => {
        const { container } = render(
            <User.Provider value={userMockConnected}>
                <AssetFilesDetails
                    files={[{ index: 0, url: '' }]}
                    ddo={({} as any) as DDO}
                />
            </User.Provider>
        )
        expect(container.querySelector('.status')).not.toBeInTheDocument()
    })
})
