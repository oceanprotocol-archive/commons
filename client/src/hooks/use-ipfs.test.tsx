import React from 'react'
import { render, wait, act } from '@testing-library/react'
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
    it('renders without crashing', async () => {
        let element: any

        await act(async () => {
            element = render(<TestComponent />)
        })

        expect(element.container.firstChild).toBeInTheDocument()
        await wait(() => element.getByText('Ready'))
    })
})
