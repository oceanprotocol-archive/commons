import { renderHook } from '@testing-library/react-hooks'
import useIpfs from './use-ipfs'

describe('use-ipfs', () => {
    it('can be called', () => {
        const { result, unmount } = renderHook(() => useIpfs())
        expect(result.current.ipfsVersion).toBe('')
        unmount()
    })
})
