const AssetModel = {
    assetId: null,
    publisherId: null,

    // OEP-08 Attributes
    // https://github.com/oceanprotocol/OEPs/tree/master/8
    base: {
        name: null,
        description: null,
        dateCreated: null,
        author: null,
        type: '',
        license: null,
        copyrightHolder: null,
        workExample: null,
        files: [],
        categories: [],
        links: [],
        inLanguage: null,
        tags: [],
        price: null
    },
    curation: {
        rating: null,
        numVotes: null,
        schema: null
    },
    additionalInformation: {
        updateFrequency: null,
        structuredMarkup: []
    }
}

export default AssetModel
