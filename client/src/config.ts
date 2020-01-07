//
// commons-server connection
//
export const serviceUri =
    process.env.REACT_APP_SERVICE_URI || 'http://localhost:4000'

//
// APP CONFIG
//
export const verbose = true
export const analyticsId = 'UA-60614729-11'

export const showChannels =
    process.env.REACT_APP_SHOW_CHANNELS === 'true' || false
export const allowPricing =
    process.env.REACT_APP_ALLOW_PRICING === 'true' || false
export const showRequestTokens =
    process.env.REACT_APP_SHOW_REQUEST_TOKENS_BUTTON === 'true' || false
// https://ipfs.github.io/public-gateway-checker/
export const ipfsGatewayUri =
    process.env.REACT_APP_IPFS_GATEWAY_URI || 'https://gateway.ipfs.io'
export const ipfsNodeUri =
    process.env.REACT_APP_IPFS_NODE_URI || 'https://ipfs.infura.io:5001'

//
// OCEAN REMOTE CONNECTIONS
//
export const nodeUri =
    process.env.REACT_APP_NODE_URI || 'https://pacific.oceanprotocol.com'
export const aquariusUri =
    process.env.REACT_APP_AQUARIUS_URI ||
    'https://aquarius.commons.oceanprotocol.com'
export const brizoUri =
    process.env.REACT_APP_BRIZO_URI || 'https://brizo.commons.oceanprotocol.com'
export const brizoAddress =
    process.env.REACT_APP_BRIZO_ADDRESS ||
    '0x008c25ed3594e094db4592f4115d5fa74c4f41ea'
export const secretStoreUri =
    process.env.REACT_APP_SECRET_STORE_URI ||
    'https://secret-store.oceanprotocol.com'
export const faucetUri =
    process.env.REACT_APP_FAUCET_URI || 'https://faucet.oceanprotocol.com'

export const CONNECTIONS = {
    pacific: {
        nodeUri: 'https://pacific.oceanprotocol.com',
        aquariusUri: 'https://aquarius.commons.oceanprotocol.com',
        brizoUri: 'https://brizo.commons.oceanprotocol.com',
        brizoAddress: '0x008c25ed3594e094db4592f4115d5fa74c4f41ea',
        secretStoreUri: 'https://secret-store.oceanprotocol.com',
        faucetUri: 'https://faucet.oceanprotocol.com',
        verbose: true
    },
    nile: {
        nodeUri: 'https://nile.dev-ocean.com',
        aquariusUri: 'https://aquarius.nile.dev-ocean.com',
        brizoUri: 'https://brizo.nile.dev-ocean.com',
        brizoAddress: '0x4aaab179035dc57b35e2ce066919048686f82972',
        secretStoreUri: 'https://secret-store.nile.dev-ocean.com',
        faucetUri: 'https://faucet.nile.dev-ocean.com',
        verbose: true
    },
    duero: {
        nodeUri: 'https://duero.dev-ocean.com',
        aquariusUri: 'https://aquarius.duero.dev-ocean.com',
        brizoUri: 'https://brizo.duero.dev-ocean.com',
        brizoAddress: '0x9d4ed58293f71122ad6a733c1603927a150735d0',
        secretStoreUri: 'https://secret-store.duero.dev-ocean.com',
        faucetUri: 'https://faucet.duero.dev-ocean.com',
        verbose: true
    }
}
