import mockAxios from 'jest-mock-axios'
import { formatBytes, pingUrl } from './utils'

const mockResponse = {
    status: 200,
    data: {}
}

const mockResponseFaulty = {
    status: 404,
    statusText: 'Not Found',
    data: {}
}

afterEach(() => {
    mockAxios.reset()
})

describe('utils', () => {
    it('formatBytes outputs as expected', () => {
        const number = 1024
        const output = formatBytes(number, 0)
        expect(output).toBe('1 KB')
    })

    it('formatBytes 0 conversion', () => {
        const number = 0
        const output = formatBytes(number, 0)
        expect(output).toBe('0 Bytes')
    })

    it('pingUrl can be called', () => {
        pingUrl('https://oceanprotocol.com')
        mockAxios.mockResponse(mockResponse)
        expect(mockAxios).toHaveBeenCalled()
    })

    it('pingUrl can be called with non 200 response', () => {
        pingUrl('https://oceanprotocol.com')
        mockAxios.mockResponse(mockResponseFaulty)
    })

    it('pingUrl error catch', () => {
        pingUrl('https://oceanprotocol.com')
        mockAxios.mockError({ message: 'Error catch' })
    })
})
