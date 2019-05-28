import cleanupContentType from './cleanupContentType'

describe('getFileCompression', () => {
    it('outputs known compression', async () => {
        const compression = await cleanupContentType('application/zip')
        expect(compression).toBe('zip')
    })

    it('outputs known x- compression', async () => {
        const compression = await cleanupContentType('application/x-gtar')
        expect(compression).toBe('gtar')
    })

    it('pass through unknown compression', async () => {
        const compression = await cleanupContentType('blabla')
        expect(compression).toBe('blabla')
    })
})
