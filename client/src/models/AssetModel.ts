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
        categories: [],
        tags: [],
        workExample: '',
        links: [],
        inLanguage: '',
        // industry: '', // suggested additional attribute
        // updateFrequency: 'seldom' // suggested additional attribute
        // custom marketplace fields
        // crowdsource: false,
        // pricingMechanism: 'Flat'
    }
}

export default AssetModel
