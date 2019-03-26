import React, { PureComponent } from 'react'
import queryString from 'query-string'
import { Logger } from '@oceanprotocol/squid'
import Button from '../../components/atoms/Button'
import styles from './AssetDetails.module.scss'

interface AssetFilesDetailsProps {
    ocean: any
    files: any[]
    ddo: any
}

export default class AssetFilesDetails extends PureComponent<
    AssetFilesDetailsProps
> {
    public state = { decryptedFiles: [] }

    private purchaseAsset = async (ddo: any) => {
        try {
            const account = await this.props.ocean.getAccounts()
            const service = ddo.findServiceByType('Access')
            const serviceAgreementSignatureResult = await this.props.ocean.signServiceAgreement(
                ddo.id,
                service.serviceDefinitionId,
                account[0]
            )
            await this.props.ocean.initializeServiceAgreement(
                ddo.id,
                service.serviceDefinitionId,
                serviceAgreementSignatureResult.agreementId,
                serviceAgreementSignatureResult.signature,
                (files: any) => this.setState({ decryptedFiles: files }),
                account[0]
            )
        } catch (e) {
            Logger.log('error', e)
        }
    }

    public render() {
        const { files, ddo } = this.props
        const filesArray = this.state.decryptedFiles
            ? this.state.decryptedFiles
            : files

        return (
            <>
                {filesArray.length > 0 &&
                    filesArray.forEach(file => (
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

                            {file.url && (
                                <Button href={file.url}>Download asset</Button>
                            )}
                        </>
                    ))}

                <Button onClick={() => this.purchaseAsset(ddo)}>
                    Get downloads
                </Button>
            </>
        )
    }
}
