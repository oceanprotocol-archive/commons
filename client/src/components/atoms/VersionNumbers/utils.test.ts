import { isJsonString } from './utils'

describe('isJsonString', () => {
    it('detects json correctly', () => {
        const testJson = isJsonString('{ "hello": "squid" }')
        expect(testJson).toBeTruthy()

        const testNonJson = isJsonString('<strong>')
        expect(testNonJson).toBeFalsy()
    })
})
