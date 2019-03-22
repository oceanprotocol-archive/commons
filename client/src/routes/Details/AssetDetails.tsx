import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/atoms/Button'
import Moment from 'react-moment'
import styles from './AssetDetails.module.scss'

interface AssetDetailsProps {
    metadata: any
    ddo: any
    purchaseAsset: any
    reportAsset: any
    signalAsset: any
    retireAsset: any
}

export default class AssetDetails extends PureComponent<AssetDetailsProps> {
    public render() {
        const {
            metadata,
            ddo,
            purchaseAsset,
            reportAsset,
            signalAsset,
            retireAsset
        } = this.props
        const { base } = metadata

        return (
            <>
                <aside className={styles.metaPrimary}>
                    <h2
                        className={styles.copyrightHolder}
                        title="Copyright Holder"
                    >
                        {base.copyrightHolder}
                    </h2>
                    <div className={styles.metaPrimaryData}>
                        <span title="Date published">
                            <Moment
                                date={base.dateCreated}
                                format="L"
                                interval={0}
                            />
                        </span>
                        {base.categories ? (
                            // TODO: Make this link to search for respective category
                            <Link to={'search?q='}>{base.categories[0]}</Link>
                        ) : (
                            <Link to={'search?q='}>Fake Category</Link>
                        )}
                        <span>fake json contentType</span>
                        <span>fake 18.5 MB</span>
                    </div>
                </aside>

                <div className={styles.description}>{base.description}</div>

                <ul className={styles.meta}>
                    <li>
                        <span className={styles.metaLabel}>
                            <strong>Author</strong>
                        </span>
                        <span className={styles.metaValue}>{base.author}</span>
                    </li>
                    <li>
                        <span className={styles.metaLabel}>
                            <strong>License</strong>
                        </span>
                        <span className={styles.metaValue}>{base.license}</span>
                    </li>
                    <li>
                        <span className={styles.metaLabel}>
                            <strong>File Encoding</strong>
                        </span>
                        <span className={styles.metaValue}>fake UTF-8</span>
                    </li>
                    <li>
                        <span className={styles.metaLabel}>
                            <strong>Compression</strong>
                        </span>
                        <span className={styles.metaValue}>fake None</span>
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
                    Download asset
                </Button>

                <Button onClick={() => reportAsset(ddo)}>Report asset</Button>

                <Button onClick={() => signalAsset(ddo)}>Like asset</Button>

                <Button onClick={() => retireAsset(ddo)}>Retire asset</Button>

                <pre>
                    <code>{JSON.stringify(metadata, null, 2)}</code>
                </pre>
            </>
        )
    }
}
