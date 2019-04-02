import { Router, Request, Response, NextFunction } from 'express'
import request from 'request'

export class UrlCheckRouter {
    public router: Router

    /**
     * Initialize the UrlCheckRouter
     */
    public constructor() {
        this.router = Router()
    }

    public checkUrl(req: Request, res: Response, next: NextFunction) {
        if (!req.body.url) {
            return res.send({ status: 'error', message: 'missing url' })
        }
        request(
            {
                method: 'HEAD',
                url: req.body.url,
                headers: { Range: 'bytes=0-' }
            },
            (error, response) => {
                if (response && response.statusCode.toString().startsWith('2')) {
                    const result: any = {}
                    result.found = true

                    if (response.headers['content-length']) {
                        result.contentLength =
                            response.headers['content-length']
                    }

                    if (response.headers['content-type']) {
                        const typeAndCharset = response.headers[
                            'content-type'
                        ].split(';')

                        result.contentType = typeAndCharset[0] // eslint-disable-line prefer-destructuring

                        if (typeAndCharset[1]) {
                            /* eslint-disable prefer-destructuring */
                            result.contentCharset = typeAndCharset[1].split(
                                '='
                            )[1]
                            /* eslint-enable prefer-destructuring */
                        }
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
