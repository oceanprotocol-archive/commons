import React, { PureComponent } from 'react'
import { User } from '../../../context'
import Web3message from '../../organisms/Web3message'
import styles from './AssetLinks.module.scss'


export default class AssetLinks extends PureComponent<{
    files: { [name: string]: string }[]
}> {
    public render() {
        const { files } = this.props

        return files.length ? (
            <>
                <div className={styles.links}>
                    {files.map(file => (
                        <a key={file.url} href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
                    ))}
                </div>
                <Web3message />
            </>
        ) : (
            <div>No links attached.</div>
        )
    }
}

AssetLinks.contextType = User
