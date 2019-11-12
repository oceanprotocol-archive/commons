import { Router, Request, Response } from 'express'
import request from 'request'
import config from '../config'

export class UrlCheckRouter {
    public router: Router

    /**
     * Initialize the UrlCheckRouter
     */
    public constructor() {
        this.router = Router()
    }

    public checkUrl(req: Request, res: Response) {
        let { url } = req.body

        if (!url) {
            return res.send({ status: 'error', message: 'missing url' })
        }

        // map native IPFS URLs to gateway URLs
        if (url.includes('ipfs://')) {
            const cid = url.split('ipfs://')[1]
            url = `${config.ipfsGatewayUri}/ipfs/${cid}`
        }

        request(
            {
                method: 'HEAD',
                url,
                headers: { Range: 'bytes=0-' }
            },
            (error, response) => {
                const { headers, statusCode } = response
                const successResponses =
                    statusCode.toString().startsWith('2') ||
                    statusCode.toString().startsWith('416')

                if (response && successResponses) {
                    const result: any = {}
                    result.found = true

                    if (headers['content-length']) {
                        result.contentLength = headers['content-length']
                    }

                    // sometimes servers send content-range header,
                    // try to use it if content-length is not present
                    if (
                        headers['content-range'] &&
                        !headers['content-length']
                    ) {
                        const size = headers['content-range'].split('/')[1]
                        result.contentLength = size
                    }

                    if (headers['content-type']) {
                        const typeAndCharset = headers['content-type'].split(
                            ';'
                        )

                        /* eslint-disable prefer-destructuring */
                        result.contentType = typeAndCharset[0]

                        if (typeAndCharset[1]) {
                            result.contentCharset = typeAndCharset[1].split(
                                '='
                            )[1]
                        }
                        /* eslint-enable prefer-destructuring */
                    }
                    return res.send({ status: 'success', result })
                }
                return res.send({ status: 'error', message: error })
            }
        )
    }

    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    public init() {
        this.router.post('/', this.checkUrl)
    }
}

// Create the MeRouter, and export its configured Express.Router
const urlCheckRoutes = new UrlCheckRouter()
urlCheckRoutes.init()

export default urlCheckRoutes.router
