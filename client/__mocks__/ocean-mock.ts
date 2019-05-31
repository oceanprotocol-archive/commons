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
        }
    }
}

export default oceanMock
