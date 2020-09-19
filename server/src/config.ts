import 'dotenv/config'

const config = {
    app: { port: 4000 },
    sendgridApiKey: process.env.SENDGRID_API_KEY || '',
    mailgunApiKey: process.env.MAILGUN_API_KEY || '',
    mailgunDomain: process.env.MAILGUN_DOMAIN || '',
    mailService: process.env.MAILSERVICE || 'sendgrid', // use either mailgun or sendgrid
    ipfsGatewayUri: process.env.IPFS_GATEWAY_URI || 'https://gateway.ipfs.io'
}

export default config
