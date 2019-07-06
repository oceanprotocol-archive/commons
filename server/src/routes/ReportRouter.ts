import { Router, Request, Response } from 'express'
import SendgridMail from '@sendgrid/mail'
import { WebClient } from '@slack/web-api'

SendgridMail.setApiKey(process.env.SENDGRID_API_KEY)
const slack = new WebClient(process.env.SLACK_TOKEN)

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
            await slack.chat.postMessage({
                text: req.body.msg.html,
                channel: 'C88KZQEBB' // #form-submissions
            })
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
