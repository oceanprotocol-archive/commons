const oceanMock = {
    ocean: {
        accounts: {
            list: () => ['xxx', 'xxx']
        },
        aquarius: {
            queryMetadata: () => {
                return {
                    results: [],
                    totalResults: 1,
                    totalPages: 1
                }
            }
        },
        assets: {
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
