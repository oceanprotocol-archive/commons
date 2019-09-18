import mockAxios from 'jest-mock-axios'
import { formatBytes, pingUrl, arraySum, readFileAsync } from './utils'

describe('formatBytes', () => {
    it('outputs as expected', () => {
        const number = 1024
        const output = formatBytes(number, 0)
        expect(output).toBe('1 KB')
    })

    it('0 conversion', () => {
        const number = 0
        const output = formatBytes(number, 0)
        expect(output).toBe('0 Bytes')
    })
})

describe('pingUrl', () => {
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

describe('arraySum', () => {
    it('outputs as expected', () => {
        const array = [2, 3]
        const output = arraySum(array)
        expect(output).toBe(5)
    })
})

describe('readFileAsync', () => {
    it('outputs as expected', async () => {
        const file = new File(['ABC'], 'filename.txt', {
            type: 'text/plain',
            lastModified: Date.now()
        })

        const output = await readFileAsync(file)
        expect(output).toBeInstanceOf(ArrayBuffer)
    })
})
