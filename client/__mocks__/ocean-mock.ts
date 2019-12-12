import searchMock from '../__fixtures__/search.json'
import brizoMock from '../__fixtures__/brizo.json'

const oceanMock = {
    ocean: {
        accounts: {
            list: () => ['xxx', 'xxx']
        },
        aquarius: {
            queryMetadata: () => searchMock
        },
        brizo: {
            getVersionInfo: () => brizoMock
        },
        assets: {
            query: () => searchMock,
            resolve: jest.fn(),
            order: () => {
                return {
                    next: jest.fn()
                }
            },
            consume: jest.fn()
        },
        keeper: {
            conditions: {
                accessSecretStoreCondition: {
                    getGrantedDidByConsumer: () => {
                        return {
                            find: jest.fn()
                        }
                    }
                }
            }
        },
        versions: {
            get: jest.fn(() =>
                Promise.resolve({
                    squid: {
                        name: 'Squid-js',
                        status: 'Working'
                    },
                    aquarius: {
                        name: 'Aquarius',
                        status: 'Working'
                    },
                    brizo: {
                        name: 'Brizo',
                        network: 'Nile',
                        status: 'Working',
                        contracts: {
                            hello: 'hello',
                            hello2: 'hello2'
                        }
                    },
                    status: {
                        ok: true,
                        network: true,
                        contracts: true
                    }
                })
            )
        }
    }
}

export default oceanMock
