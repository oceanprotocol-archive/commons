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

console.log(process.env.REACT_APP_OCEAN_NETWORK)

const altNetwork =
    process.env.REACT_APP_OCEAN_NETWORK === 'spree'
        ? {
              spree: {
                  nodeUri:
                      process.env.REACT_APP_NODE_URI ||
                      'https://pacific.oceanprotocol.com',
                  aquariusUri:
                      process.env.REACT_APP_AQUARIUS_URI ||
                      'https://aquarius.commons.oceanprotocol.com',
                  brizoUri:
                      process.env.REACT_APP_BRIZO_URI ||
                      'https://brizo.commons.oceanprotocol.com',
                  brizoAddress:
                      process.env.REACT_APP_BRIZO_ADDRESS ||
                      '0x008c25ed3594e094db4592f4115d5fa74c4f41ea',
                  secretStoreUri:
                      process.env.REACT_APP_SECRET_STORE_URI ||
                      'https://secret-store.oceanprotocol.com',
                  faucetUri:
                      process.env.REACT_APP_FAUCET_URI ||
                      'https://faucet.oceanprotocol.com'
              }
          }
        : null
export const CONNECTIONS = {
    pacific: {
        nodeUri:
            process.env.REACT_APP_NODE_URI ||
            'https://pacific.oceanprotocol.com',
        aquariusUri:
            process.env.REACT_APP_AQUARIUS_URI ||
            'https://aquarius.commons.oceanprotocol.com',
        brizoUri:
            process.env.REACT_APP_BRIZO_URI ||
            'https://brizo.commons.oceanprotocol.com',
        brizoAddress:
            process.env.REACT_APP_BRIZO_ADDRESS ||
            '0x008c25ed3594e094db4592f4115d5fa74c4f41ea',
        secretStoreUri:
            process.env.REACT_APP_SECRET_STORE_URI ||
            'https://secret-store.oceanprotocol.com',
        faucetUri:
            process.env.REACT_APP_FAUCET_URI ||
            'https://faucet.oceanprotocol.com'
    },
    nile: {
        nodeUri: process.env.REACT_APP_NODE_URI || 'https://nile.dev-ocean.com',
        aquariusUri:
            process.env.REACT_APP_AQUARIUS_URI ||
            'https://aquarius.nile.dev-ocean.com',
        brizoUri:
            process.env.REACT_APP_BRIZO_URI ||
            'https://brizo.nile.dev-ocean.com',
        brizoAddress:
            process.env.REACT_APP_BRIZO_ADDRESS ||
            '0x4aaab179035dc57b35e2ce066919048686f82972',
        secretStoreUri:
            process.env.REACT_APP_SECRET_STORE_URI ||
            'https://secret-store.nile.dev-ocean.com',
        faucetUri:
            process.env.REACT_APP_FAUCET_URI ||
            'https://faucet.nile.dev-ocean.com'
    },
    duero: {
        nodeUri:
            process.env.REACT_APP_NODE_URI || 'https://duero.dev-ocean.com',
        aquariusUri:
            process.env.REACT_APP_AQUARIUS_URI ||
            'https://aquarius.duero.dev-ocean.com',
        brizoUri:
            process.env.REACT_APP_BRIZO_URI ||
            'https://brizo.duero.dev-ocean.com',
        brizoAddress:
            process.env.REACT_APP_BRIZO_ADDRESS ||
            '0x9d4ed58293f71122ad6a733c1603927a150735d0',
        secretStoreUri:
            process.env.REACT_APP_SECRET_STORE_URI ||
            'https://secret-store.duero.dev-ocean.com',
        faucetUri:
            process.env.REACT_APP_FAUCET_URI ||
            'https://faucet.duero.dev-ocean.com'
    },
    ...altNetwork
}
