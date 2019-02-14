import React, { PureComponent } from 'react'
import Button from '../../components/atoms/Button'
import styles from './AssetDetails.module.scss'

interface AssetDetailsProps {
    metadata: any
    ddo: any
    purchaseAsset: any
}

export default class AssetDetails extends PureComponent<AssetDetailsProps> {
    public render() {
        const { metadata, ddo, purchaseAsset } = this.props

        return (
            <>
                <aside className={styles.metaPrimary}>
                    <h2 className={styles.copyrightHolder}>
                        {metadata.base.copyrightHolder}
                    </h2>
                    <div className={styles.metaPrimaryData}>
                        <span>{metadata.base.dateCreated}</span>
                        <span>json</span>
                        <span>18.5 MB</span>
                        {metadata.base.categories && (
                            <span>{metadata.base.categories[0]}</span>
                        )}
                    </div>
                </aside>

                <div>{metadata.base.description}</div>

                <ul className={styles.meta}>
                    <li>
                        <span className={styles.metaLabel}>
                            <strong>Author</strong>
                        </span>
                        <span className={styles.metaValue}>
                            {metadata.base.author}
                        </span>
                    </li>
                    <li>
                        <span className={styles.metaLabel}>
                            <strong>License</strong>
                        </span>
                        <span className={styles.metaValue}>
                            {metadata.base.license}
                        </span>
                    </li>
                    <li>
                        <span className={styles.metaLabel}>
                            <strong>File Encoding</strong>
                        </span>
                        <span className={styles.metaValue}>UTF-8</span>
                    </li>
                    <li>
                        <span className={styles.metaLabel}>
                            <strong>Compression</strong>
                        </span>
                        <span className={styles.metaValue}>None</span>
                    </li>
                    <li>
                        <span className={styles.metaLabel}>
                            <strong>DID</strong>
                        </span>
                        <span className={styles.metaValue}>
                            <code>{ddo.id}</code>
                        </span>
                    </li>
                </ul>

                <Button onClick={() => purchaseAsset(ddo)}>
                    Purchase asset
                </Button>

                <pre>
                    <code>{JSON.stringify(metadata, null, 2)}</code>
                </pre>
            </>
        )
    }
}
