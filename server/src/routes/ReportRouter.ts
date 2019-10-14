import { Router, Request, Response } from 'express'
import SendgridMail from '@sendgrid/mail'
import config from '../config'

SendgridMail.setApiKey(config.sendgridApiKey)

export class ReportRouter {
    public router: Router

    public constructor() {
        this.router = Router()
    }

    public async sendMessage(req: Request, res: Response) {
        if (!req.body.msg) {
            return res.send({ status: 'error', message: 'missing message' })
        }

        try {
            await SendgridMail.send(req.body.msg)
            return res.send({ status: 'success' })
        } catch (error) {
            console.error(`${error.code} - ${error.message}`) // eslint-disable-line
            res.send(`${error.code} - ${error.message}`)
        }
    }

    public init() {
        this.router.post('/', this.sendMessage)
    }
}

const reportRoutes = new ReportRouter()
reportRoutes.init()

export default reportRoutes.router
