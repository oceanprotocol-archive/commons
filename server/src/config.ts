import 'dotenv/config'

const config = {
    app: { port: 4000 },
    sendgridApiKey: process.env.SENDGRID_API_KEY || '',
    mailgunApiKey: process.env.MAILGUN_API_KEY || '',
    mailgunDomain: process.env.MAILGUN_DOMAIN || '',
    mailService: process.env.MAILSERVICE || 'SendGrid', // use either SendGrid or MailGun
    ipfsGatewayUri: process.env.IPFS_GATEWAY_URI || 'https://gateway.ipfs.io'
}

export default config
