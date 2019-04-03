import React, { PureComponent } from 'react'
import { Logger } from '@oceanprotocol/squid'
import filesize from 'filesize'
import { User } from '../../context/User'
import Button from '../../components/atoms/Button'
import Spinner from '../../components/atoms/Spinner'
import styles from './AssetFilesDetails.module.scss'

interface AssetFilesDetailsProps {
    files: any[]
    ddo: any
}

export default class AssetFilesDetails extends PureComponent<
    AssetFilesDetailsProps
> {
    public state = { isLoading: false, error: null }

    private purchaseAsset = async (ddo: any) => {
        this.setState({ isLoading: true, error: null })

        const { ocean } = this.context

        try {
            const accounts = await ocean.accounts.list()
            const accessService = ddo.findServiceByType('Access')
            const agreementId = await ocean.assets.order(
                ddo.id,
                accessService.serviceDefinitionId,
                accounts[0]
            )
            const folder = ''
            await ocean.assets.consume(
                agreementId,
                ddo.id,
                accessService.serviceDefinitionId,
                accounts[0],
                folder
            )
            this.setState({ isLoading: false })
        } catch (error) {
            Logger.log('error', error)
            this.setState({ isLoading: false, error: error.message })
        }
    }

    public render() {
        const { files, ddo } = this.props

        return files ? (
            <>
                <div className={styles.files}>
                    {files.map(file => (
                        <ul key={file.index} className={styles.file}>
                            <li>
                                {file.contentType &&
                                    file.contentType.split('/')[1]}
                            </li>
                            <li>
                                {file.contentLength &&
                                    filesize(file.contentLength)}
                            </li>
                            {/* <li>{file.encoding}</li> */}
                            {/* <li>{file.compression}</li> */}
                        </ul>
                    ))}
                </div>

                {this.state.isLoading ? (
                    <Spinner message="Decrypting files, please sign with your wallet..." />
                ) : (
                    <Button
                        primary
                        className={styles.buttonMain}
                        onClick={() => this.purchaseAsset(ddo)}
                    >
                        Get asset files
                    </Button>
                )}

                {this.state.error && (
                    <div className={styles.error}>{this.state.error}</div>
                )}
            </>
        ) : (
            <div>No files attached.</div>
        )
    }
}

AssetFilesDetails.contextType = User
