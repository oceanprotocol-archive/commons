import 'dotenv/config'

const config = {
    app: { port: 4000 },
    sendgridApiKey: process.env.SENDGRID_API_KEY,
    ipfsGatewayUri: process.env.IPFS_GATEWAY_URI || 'https://gateway.ipfs.io'
}

export default config
