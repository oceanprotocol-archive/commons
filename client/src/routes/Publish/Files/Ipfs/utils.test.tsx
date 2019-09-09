import { formatBytes } from './utils'

describe('utils', () => {
    it('formatBytes outputs as expected', () => {
        const number = 1024
        const output = formatBytes(number, 0)
        expect(output).toBe('1 KB')
    })
})
