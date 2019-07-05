//
// commons-server connection
//
export const serviceUri =
    process.env.REACT_APP_SERVICE_URI || 'http://localhost:4000'

//
// OCEAN REMOTE CONNECTIONS
//
export const nodeUri =
    process.env.REACT_APP_NODE_URI || 'https://nile.dev-ocean.com'
export const aquariusUri =
    process.env.REACT_APP_AQUARIUS_URI || 'https://aquarius.nile.dev-ocean.com'
export const brizoUri =
    process.env.REACT_APP_BRIZO_URI || 'https://brizo.nile.dev-ocean.com'
export const brizoAddress =
    process.env.REACT_APP_BRIZO_ADDRESS ||
    '0x4aaab179035dc57b35e2ce066919048686f82972'
export const secretStoreUri =
    process.env.REACT_APP_SECRET_STORE_URI ||
    'https://secret-store.nile.dev-ocean.com'
export const faucetUri =
    process.env.REACT_APP_FAUCET_URI || 'https://faucet.nile.dev-ocean.com'

//
// APP CONFIG
//
export const verbose = true
