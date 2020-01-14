//
// commons-server connection
//
export const serviceUri =
    process.env.REACT_APP_SERVICE_URI || 'http://localhost:4000'

export const marketplaceId =
    process.env.REACT_APP_MARKETPLACE_ID || 'decentramindsMkpl'

//
// OCEAN REMOTE CONNECTIONS
//
export const networkId =
    process.env.REACT_APP_NETWORK || 'pacific'
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

export const boxUnionsModerator = '0x627306090abaB3A6e1400e9345bC60c78a8BEf57'

//
// APP CONFIG
//
export const verbose = true
export const analyticsId = null
export const allowPricing = process.env.REACT_APP_ALLOW_PRICING || false
export const showRequestTokens =
    process.env.REACT_APP_SHOW_REQUEST_TOKENS_BUTTON === 'true' || false
// https://ipfs.github.io/public-gateway-checker/
export const ipfsGatewayUri =
    process.env.REACT_APP_IPFS_GATEWAY_URI || 'https://gateway.ipfs.io'
export const ipfsNodeUri =
    process.env.REACT_APP_IPFS_NODE_URI || 'https://ipfs.infura.io:5001'

//
// OPWallet CONFIG
export const portisEnabled = process.env.REACT_APP_PORTIS_APP_ID === 'true' || false
export const portisAppId = process.env.REACT_APP_PORTIS_APP_ID
export const torusEnabled = process.env.REACT_APP_TORUS_ENABLED === 'true' || false

export const subgraphGraphqlEndpoint = process.env.SUBGRAPH_GRAPHQL_ENDPOINT ||
      'http://ec2-54-87-184-199.compute-1.amazonaws.com:8000/subgraphs/name/santteegt/oceanprotocol-subgraph'
