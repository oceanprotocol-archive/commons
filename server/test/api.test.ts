import request from 'supertest'
import server from '../src/server'

afterAll(done => {
    server.close(done)
})

describe('GET /', () => {
    it('responds with success', async () => {
        const response = await request(server).get('/')
        expect(response.status).toBe(200)
    })
})

describe('POST /api/v1/urlcheck', () => {
    it('responds with json', async () => {
        const response = await request(server).post('/api/v1/urlcheck')
        expect(response.status).toBe(200)
    })

    it('responds with error message when url is missing', async () => {
        const response = await request(server).post('/api/v1/urlcheck')
        const text = await JSON.parse(response.text)
        expect(text.message).toBe('missing url')
    })
})

describe('Errors', () => {
    it('responds with 404 on unknown path', async () => {
        const response = await request(server).post('/whatever')
        expect(response.status).toBe(404)
    })
})
