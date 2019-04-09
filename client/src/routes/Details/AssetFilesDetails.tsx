import React, { PureComponent } from 'react'
import AssetFile from './AssetFile'
import { User } from '../../context/User'
import Web3message from '../../components/organisms/Web3message'
import styles from './AssetFilesDetails.module.scss'

export default class AssetFilesDetails extends PureComponent<{ files: any[], ddo: any }> {
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
                        <AssetFile key={file.index} ddo={ddo} file={file} />
                    ))}
                </div>
                <User.Consumer>
                    {states =>
                        (!states.isNile || !states.isLogged) && <Web3message />
                    }
                </User.Consumer>
            </>
        ) : (
            <div>No files attached.</div>
        )
    }
}
