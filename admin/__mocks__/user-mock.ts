import oceanMock from './ocean-mock'

const userMock = {
    isLogged: false,
    isLoading: false,
    isWeb3: false,
    isOceanNetwork: false,
    account: '',
    web3: {},
    ...oceanMock,
    balance: { eth: 0, ocn: 0 },
    network: '',
    requestFromFaucet: jest.fn(),
    unlockAccounts: jest.fn(),
    message: ''
}

const userMockConnected = {
    isLogged: true,
    isLoading: false,
    isWeb3: true,
    isOceanNetwork: true,
    account: '0xxxxxx',
    web3: {},
    ...oceanMock,
    balance: { eth: 0, ocn: 0 },
    network: '',
    requestFromFaucet: jest.fn(),
    unlockAccounts: jest.fn(),
    message: ''
}

export { userMock, userMockConnected }
