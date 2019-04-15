import React, { PureComponent } from 'react'
import AssetFile from './AssetFile'
import { User } from '../../context'
import Web3message from '../../components/organisms/Web3message'
import styles from './AssetFilesDetails.module.scss'

export default class AssetFilesDetails extends PureComponent<{
    files: any[]
    ddo: any
}> {
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
