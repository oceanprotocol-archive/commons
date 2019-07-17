import React, { PureComponent } from 'react'
import { DDO, File } from '@oceanprotocol/squid'
import AssetFile from './AssetFile'
import { User } from '../../../context'
import Web3message from '../../organisms/Web3message'
import styles from './AssetFilesDetails.module.scss'

export default class AssetFilesDetails extends PureComponent<{
    files: File[]
    ddo: DDO
}> {
    public render() {
        const { files, ddo } = this.props

        return files.length ? (
            <>
                <div className={styles.files}>
                    {files.map(file => (
                        <AssetFile key={file.index} ddo={ddo} file={file} />
                    ))}
                </div>
                <Web3message />
            </>
        ) : (
            <div>No files attached.</div>
        )
    }
}

AssetFilesDetails.contextType = User
