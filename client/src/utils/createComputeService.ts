export async function createComputeService(
    ocean: any,
    publisher: any,
    price: string,
    datePublished: string
) {
    const { templates } = ocean.keeper
    const serviceAgreementTemplate = await templates.escrowComputeExecutionTemplate.getServiceAgreementTemplate()
    const name = 'dataAssetComputingServiceAgreement'
    return {
        type: 'compute',
        serviceEndpoint: ocean.brizo.getComputeEndpoint(),
        templateId: templates.escrowComputeExecutionTemplate.getId(),
        attributes: {
            main: {
                creator: publisher.getId(),
                datePublished,
                price,
                timeout: 3600,
                name
            },
            serviceAgreementTemplate
        }
    }
}
