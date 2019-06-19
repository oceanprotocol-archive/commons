import React from 'react'
import { render } from '@testing-library/react'
import VersionStatus from './VersionStatus'

describe('VersionStatus', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <VersionStatus
                status={{ ok: false, contracts: false, network: false }}
            />
        )
        expect(container.firstChild).toBeInTheDocument()
    })

    it('renders true states', () => {
        const { container } = render(
            <VersionStatus
                status={{ ok: true, contracts: false, network: false }}
            />
        )
        expect(container.firstChild).toBeInTheDocument()
    })
})
