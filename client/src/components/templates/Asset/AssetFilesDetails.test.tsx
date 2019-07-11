/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react'
import { render } from '@testing-library/react'
import { DDO } from '@oceanprotocol/squid'
import AssetFilesDetails from './AssetFilesDetails'
import { User } from '../../../context'
import { userMockConnected } from '../../../../__mocks__/user-mock'

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
})
