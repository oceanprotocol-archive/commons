// Metadata schema definitions
// https://github.com/oceanprotocol/squid-js/blob/master/src/ddo/MetaData.ts
const AssetModelBase = {
    assetId: null,
    publisherId: null,

    // OEP-08 Attributes
    // https://github.com/oceanprotocol/OEPs/tree/master/8
    base: {
        name: null,
        dateCreated: null,
        author: null,
        license: null,
        price: '',
        files: [],
        categories: [],
        tags: [],
        type: '',
        description: null,
        copyrightHolder: null,
        workExample: '',
        /*  [
         *    {
         *      anotherSample: "http://data.ceda.ac.uk/badc/ukcp09/data/gridded-land-obs/gridded-land-obs-daily/",
         *    },
         *    {
         *      fieldsDescription: "http://data.ceda.ac.uk/badc/ukcp09/",
         *    },
         *  ]
         */
        links: [],
        inLanguage: ''
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
