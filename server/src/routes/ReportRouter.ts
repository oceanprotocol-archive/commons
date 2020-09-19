import { Router, Request, Response } from 'express'
import config from '../config'
import SendgridMail from '@sendgrid/mail'
var mailgun = require('mailgun-js');

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
            if (config.mailService === 'MailGun') {
                const data = {
                    "from": req.body.msg.from,
                    "to": req.body.msg.to,
                    "subject": req.body.msg.subject,
                    "text": req.body.msg.text,
                    "html": req.body.msg.html
                };
                var x = config.mailgunApiKey;
                var y = config.mailgunDomain;
                const mg = mailgun({ apiKey: config.mailgunApiKey, domain: config.mailgunDomain });
                await mg.messages().send(data, (error, body) => {
                    if (error) console.log(error)
                    else return res.send({ status: 'success' });
                });
            }
            else {
                SendgridMail.setApiKey(config.sendgridApiKey)
                await SendgridMail.send(req.body.msg)
                return res.send({ status: 'success' })
            }
        }
        catch (error) {
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
