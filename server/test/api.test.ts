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
    it('responds with json on http://', async () => {
        const response = await request(server)
            .post('/api/v1/urlcheck')
            .send({ url: 'https://oceanprotocol.com/tech-whitepaper.pdf' })
        expect(response.status).toBe(200)
        expect(response.body).toBeTruthy()
    })

    it('responds with json on ipfs://', async () => {
        const response = await request(server)
            .post('/api/v1/urlcheck')
            .send({
                url:
                    'ipfs://QmX5LRpEVocfks9FNDnRoK2imf2fy9mPpP4wfgaDVXWfYD/video.mp4'
            })
        expect(response.status).toBe(200)
        expect(response.body).toBeTruthy()
    })

    it('responds with error message when url is missing', async () => {
        const response = await request(server).post('/api/v1/urlcheck')
        const text = await JSON.parse(response.text)
        expect(text.message).toBe('missing url')
    })
})

describe('POST /api/v1/report', () => {
    const msg = {
        to: 'test@example.com',
        from: 'test@example.com',
        subject: 'My Subject',
        text: 'Text',
        html: '<strong>HTML</strong>'
    }

    it('responds with json', async () => {
        const response = await request(server)
            .post('/api/v1/report')
            .send({ msg })
        expect(response.status).toBe(200)
        expect(response.body).toBeTruthy()
    })

    it('responds with error', async () => {
        const response = await request(server)
            .post('/api/v1/report')
            .send({ msg: 'Hello World' })
        expect(response.text).toBe(
            "undefined - Cannot create property 'isMultiple' on string 'Hello World'"
        )
    })

    it('responds with error message when message is missing', async () => {
        const response = await request(server).post('/api/v1/report')
        const text = await JSON.parse(response.text)
        expect(text.message).toBe('missing message')
    })
})

describe('Errors', () => {
    it('responds with 404 on unknown path', async () => {
        const response = await request(server).post('/whatever')
        expect(response.status).toBe(404)
    })
})
