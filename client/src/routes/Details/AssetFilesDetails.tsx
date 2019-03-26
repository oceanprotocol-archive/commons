import React, { PureComponent } from 'react'
import queryString from 'query-string'
import { Logger } from '@oceanprotocol/squid'
import Button from '../../components/atoms/Button'
import styles from './AssetDetails.module.scss'

interface AssetFilesDetailsProps {
    files: any[]
    ddo: string
}

export default class AssetFilesDetails extends PureComponent<
    AssetFilesDetailsProps
> {
    private purchaseAsset = async (ddo: any) => {
        try {
            const account = await this.context.ocean.getAccounts()
            const service = ddo.findServiceByType('Access')
            const serviceAgreementSignatureResult = await this.context.ocean.signServiceAgreement(
                ddo.id,
                service.serviceDefinitionId,
                account[0]
            )
            await this.context.ocean.initializeServiceAgreement(
                ddo.id,
                service.serviceDefinitionId,
                serviceAgreementSignatureResult.agreementId,
                serviceAgreementSignatureResult.signature,
                (files: any) => {
                    Logger.log('downloading files', files)
                    files.forEach((file: any) => {
                        const parsedUrl: any = queryString.parseUrl(file)
                        // setTimeout(() => {
                        //     // eslint-disable-next-line
                        //     window.open(parsedUrl.query.url)
                        // }, 100)
                    })
                },
                account[0]
            )
        } catch (e) {
            Logger.log('error', e)
        }
    }

    public render() {
        const { files, ddo } = this.props

        return (
            <>
                {files.forEach(file => {
                    const parsedUrl: any = queryString.parseUrl(file)

                    return (
                        <>
                            <h2>{file.name}</h2>
                            <ul>
                                <li>
                                    <span className={styles.metaLabel}>
                                        <strong>Content Type</strong>
                                    </span>
                                    <span className={styles.metaValue}>
                                        {file.contentType}
                                    </span>
                                </li>
                                <li>
                                    <span className={styles.metaLabel}>
                                        <strong>Size</strong>
                                    </span>
                                    <span className={styles.metaValue}>
                                        {file.contentLength}
                                    </span>
                                </li>
                                <li>
                                    <span className={styles.metaLabel}>
                                        <strong>File Encoding</strong>
                                    </span>
                                    <span className={styles.metaValue}>
                                        {file.encoding}
                                    </span>
                                </li>
                                <li>
                                    <span className={styles.metaLabel}>
                                        <strong>Compression</strong>
                                    </span>
                                    <span className={styles.metaValue}>
                                        {file.compression}
                                    </span>
                                </li>
                            </ul>

                            <Button href={parsedUrl.query.url}>
                                Download asset
                            </Button>
                        </>
                    )
                })}

                <Button onClick={() => this.purchaseAsset(ddo)}>
                    Get downloads
                </Button>
            </>
        )
    }
}
