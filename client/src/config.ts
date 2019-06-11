//
// commons-server connection
//
export const serviceScheme = process.env.REACT_APP_SERVICE_SCHEME || 'http'
export const serviceHost = process.env.REACT_APP_SERVICE_HOST || 'localhost'
export const servicePort = process.env.REACT_APP_SERVICE_PORT || 4000

//
// OCEAN REMOTE CONNECTIONS
//
export const nodeScheme = process.env.REACT_APP_NODE_SCHEME || 'https'
export const nodeHost = process.env.REACT_APP_NODE_HOST || 'nile.dev-ocean.com'
export const nodePort = process.env.REACT_APP_NODE_PORT || 443

export const aquariusScheme = process.env.REACT_APP_AQUARIUS_SCHEME || 'https'
export const aquariusHost =
    process.env.REACT_APP_AQUARIUS_HOST || 'nginx-aquarius.dev-ocean.com'
export const aquariusPort = process.env.REACT_APP_AQUARIUS_PORT || 443

export const brizoScheme = process.env.REACT_APP_BRIZO_SCHEME || 'https'
export const brizoHost =
    process.env.REACT_APP_BRIZO_HOST || 'nginx-brizo.dev-ocean.com'
export const brizoPort = process.env.REACT_APP_BRIZO_PORT || 443
export const brizoAddress =
    process.env.REACT_APP_BRIZO_ADDRESS ||
    '0x4aaab179035dc57b35e2ce066919048686f82972'

export const parityScheme = process.env.REACT_APP_PARITY_SCHEME || 'https'
export const parityHost =
    process.env.REACT_APP_PARITY_HOST || 'nile.dev-ocean.com'
export const parityPort = process.env.REACT_APP_PARITY_PORT || 443

export const secretStoreScheme =
    process.env.REACT_APP_SECRET_STORE_SCHEME || 'https'
export const secretStoreHost =
    process.env.REACT_APP_SECRET_STORE_HOST || 'secret-store.dev-ocean.com'
export const secretStorePort = process.env.REACT_APP_SECRET_STORE_PORT || 443

export const faucetScheme = process.env.REACT_APP_FAUCET_SCHEME || 'https'
export const faucetHost =
    process.env.REACT_APP_FAUCET_HOST || 'faucet.nile.dev-ocean.com'
export const faucetPort = process.env.REACT_APP_FAUCET_PORT || 443

export const verbose = true

//
// APP CONFIG
//
export const analyticsId = 'UA-60614729-11'
