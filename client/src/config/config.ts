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
    '0x376817c638d2a04f475a73af37f7b51a2862d567'

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

//
// OCEAN LOCAL CONNECTIONS
// e.g. when running with barge
//
// export const nodeScheme = 'http'
// export const nodeHost = 'localhost'
// export const nodePort = 8545

// export const aquariusScheme = 'http'
// export const aquariusHost = 'aquarius'
// export const aquariusPort = 5000

// export const brizoScheme = 'http'
// export const brizoHost = 'localhost'
// export const brizoPort = 8030

// export const parityScheme = 'http'
// export const parityHost = 'localhost'
// export const parityPort = 8545
// export const threshold = 0
// export const password = 'node0'
// export const address = '0x00bd138abd70e2f00903268f3db08f2d25677c9e'

// export const secretStoreScheme = 'http'
// export const secretStoreHost = 'localhost'
// export const secretStorePort = 12001

// export const faucetScheme = 'http'
// export const faucetHost = 'localhost'
// export const faucetPort = 3001

export const verbose = true