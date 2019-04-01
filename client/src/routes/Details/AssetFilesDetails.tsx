import React, { PureComponent } from 'react'
import { Logger } from '@oceanprotocol/squid'
import Button from '../../components/atoms/Button'
import Spinner from '../../components/atoms/Spinner'
import styles from './AssetFilesDetails.module.scss'

interface AssetFilesDetailsProps {
    ocean: any
    files: any[]
    ddo: any
}

export default class AssetFilesDetails extends PureComponent<
    AssetFilesDetailsProps
> {
    public state = { decryptedFiles: [], isLoading: false, error: null }

    private purchaseAsset = async (ddo: any) => {
        this.setState({ isLoading: true, error: null })
        try {
            const account = await this.props.ocean.accounts.list()
            const accessService = ddo.findServiceByType('Access')
            const agreementId = await this.props.ocean.assets.order(
                ddo.id,
                accessService.serviceDefinitionId,
                account[0]
            )
            const folder = ""
            await this.props.ocean.assets.consume(agreementId, ddo.id, accessService.serviceDefinitionId, account[0], folder)
            this.setState({ isLoading: false })
        } catch (error) {
            Logger.log('error', error)
            this.setState({ isLoading: false, error: error.message })
        }
    }

    public render() {
        const { files, ddo } = this.props
        const filesArray =
            this.state.decryptedFiles.length > 0
                ? this.state.decryptedFiles
                : files

        return (
            <>
                {this.state.decryptedFiles.length > 0 ? (
                    filesArray.forEach(file => (
                        <>
                            <ul>
                                {/*
                                    TODO: getting this metadata depends on a change to to OEP-8,
                                    see: https://github.com/oceanprotocol/OEPs/pull/154
                                */}
                                {/* <li>{file.contentType}</li> */}
                                <li>{file.contentLength}</li>
                                {/* <li>{file.encoding}</li> */}
                                {/* <li>{file.compression}</li> */}
                            </ul>

                            {file.url && (
                                <Button href={file.url}>Download asset</Button>
                            )}
                        </>
                    ))
                ) : this.state.isLoading ? (
                    <Spinner message="Decrypting files, please sign with your wallet..." />
                ) : (
                    <>
                        <Button
                            primary
                            className={styles.buttonMain}
                            onClick={() => this.purchaseAsset(ddo)}
                        >
                            Get asset files
                        </Button>
                        {this.state.error && (
                            <div className={styles.error}>
                                {this.state.error}
                            </div>
                        )}
                    </>
                )}
            </>
        )
    }
}
