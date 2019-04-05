//
// commons-server connection
//
export const serviceScheme = process.env.SERVICE_SCHEME || 'http'
export const serviceHost = process.env.SERVICE_HOST || 'localhost'
export const servicePort = process.env.SERVICE_PORT || 4000

//
// OCEAN REMOTE CONNECTIONS
//
export const nodeScheme = process.env.NODE_SCHEME || 'https'
export const nodeHost = process.env.NODE_HOST || 'nile.dev-ocean.com'
export const nodePort = process.env.NODE_PORT || 443

export const aquariusScheme = process.env.AQUARIUS_SCHEME || 'https'
export const aquariusHost = process.env.AQUARIUS_HOST || 'nginx-aquarius.dev-ocean.com'
export const aquariusPort = process.env.AQUARIUS_PORT || 443

export const brizoScheme = process.env.BRIZO_SCHEME || 'https'
export const brizoHost = process.env.BRIZO_HOST || 'nginx-brizo.dev-ocean.com'
export const brizoPort = process.env.BRIZO_PORT || 443
export const brizoAddress = process.env.BRIZO_ADDRESS || '0x376817c638d2a04f475a73af37f7b51a2862d567'

export const parityScheme = process.env.PARITY_SCHEME || 'https'
export const parityHost = process.env.PARITY_HOST || 'nile.dev-ocean.com'
export const parityPort = process.env.PARITY_PORT || 443

export const secretStoreScheme = process.env.SECRET_STORE_SCHEME || 'https'
export const secretStoreHost = process.env.SECRET_STORE_HOST || 'secret-store.dev-ocean.com'
export const secretStorePort = process.env.SECRET_STORE_PORT || 443

export const faucetScheme = process.env.FAUCET_SCHEME || 'https'
export const faucetHost = process.env.FAUCET_HOST || 'faucet.nile.dev-ocean.com'
export const faucetPort = process.env.FAUCET_PORT || 443

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

