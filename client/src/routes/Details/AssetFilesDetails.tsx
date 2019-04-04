import React, { PureComponent } from 'react'
import AssetFile from './AssetFile'
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
            </>
        ) : (
            <div>No files attached.</div>
        )
    }
}
