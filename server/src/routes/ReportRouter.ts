import { Router, Request, Response } from 'express'
import SendgridMail from '@sendgrid/mail'

SendgridMail.setApiKey(process.env.SENDGRID_API_KEY)

export class ReportRouter {
    public router: Router

    public constructor() {
        this.router = Router()
    }

    public async sendEmail(req: Request, res: Response) {
        if (!req.body.msg) {
            return res.send({ status: 'error', message: 'missing message' })
        }

        try {
            await SendgridMail.send(req.body.msg)
            return res.send({ status: 'success' })
        } catch (error) {
            res.send(`${error.code} - ${error.message}`)
        }
    }

    public init() {
        this.router.post('/', this.sendEmail)
    }
}

const reportRoutes = new ReportRouter()
reportRoutes.init()

export default reportRoutes.router
