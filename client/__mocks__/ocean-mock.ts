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
        keeper: {
            conditions: {
                accessSecretStoreCondition: {
                    getGrantedDidByConsumer: jest.fn()
                }
            }
        }
    }
}

export default oceanMock
