import 'dotenv/config'

const config = {
    app: { port: 4000 },
    sendgridApiKey: process.env.SENDGRID_API_KEY,
    ipfsGatewayUrl: process.env.IPFS_GATEWAY_URL || 'https://gateway.ipfs.io'
}

export default config
