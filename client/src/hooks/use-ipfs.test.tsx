import React from 'react'
import { render } from '@testing-library/react'
import useIpfs from './use-ipfs'

export default function TestComponent() {
    const { ipfsVersion, isIpfsReady, ipfsError, ipfsMessage } = useIpfs()

    return (
        <div>
            {isIpfsReady && <span>Ready</span>}
            {ipfsVersion} - {ipfsMessage} - {ipfsError}
        </div>
    )
}

describe('use-ipfs', () => {
    it('renders without crashing', () => {
        const { container } = render(<TestComponent />)
        expect(container.firstChild).toBeInTheDocument()
    })
})
