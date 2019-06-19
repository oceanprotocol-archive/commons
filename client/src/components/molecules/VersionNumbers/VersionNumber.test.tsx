import React from 'react'
import { render } from '@testing-library/react'
import VersionNumber from './VersionNumber'

describe('VersionNumber', () => {
    it('renders without crashing', () => {
        const { container } = render(<VersionNumber name="Commons" />)
        expect(container.firstChild).toBeInTheDocument()
    })

    it('renders with all props set', () => {
        const { container } = render(
            <VersionNumber
                name="Commons"
                version="6.6.6"
                network="Nile"
                commit="xxxxxxxxxxx"
            />
        )
        expect(container.firstChild).toBeInTheDocument()
        expect(container.firstChild).toHaveTextContent('6.6.6')
    })
})
