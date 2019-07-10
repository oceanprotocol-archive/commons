import oceanMock from './ocean-mock'

const userMock = {
    isLogged: false,
    isLoading: false,
    isBurner: false,
    isOceanNetwork: false,
    account: '',
    web3: {},
    ...oceanMock,
    balance: { eth: 0, ocn: 0 },
    network: '',
    requestFromFaucet: jest.fn(),
    loginMetamask: jest.fn(),
    loginBurnerWallet: jest.fn(),
    message: ''
}

const userMockConnected = {
    isLogged: true,
    isLoading: false,
    isBurner: false,
    isOceanNetwork: true,
    account: '0xxxxxx',
    web3: {},
    ...oceanMock,
    balance: { eth: 0, ocn: 0 },
    network: '',
    requestFromFaucet: jest.fn(),
    loginMetamask: jest.fn(),
    loginBurnerWallet: jest.fn(),
    message: ''
}

export { userMock, userMockConnected }
