import { MetaData } from '@oceanprotocol/squid'

const AssetModel: MetaData = {
    // OEP-08 Attributes
    // https://github.com/oceanprotocol/OEPs/tree/master/8
    main: {
        type: 'dataset',
        name: '',
        dateCreated: '',
        author: '',
        license: '',
        price: '',
        files: []
    },
    additionalInformation: {
        description: '',
        copyrightHolder: '',
        categories: []
    }
}

export const AssetModelFull = {
    ...AssetModelBase,
    additionalInformation: {
        // sla: null,
        // industry: null,
        updateFrequency: null,
        // termsOfService: null,
        // privacy: null,
        // keywork: null,
        structuredMarkup: {
            uri: null,
            mediaType: null
        },
        checksum: null
    },
    curation: {
        rating: null,
        numVotes: null,
        schema: ''
    }

}

export default AssetModelBase
