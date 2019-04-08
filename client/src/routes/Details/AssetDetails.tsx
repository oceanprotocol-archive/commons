import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import styles from './AssetDetails.module.scss'
import AssetFilesDetails from './AssetFilesDetails'

interface AssetDetailsProps {
    metadata: any
    ddo: any
}

export default class AssetDetails extends PureComponent<AssetDetailsProps> {
    private datafilesLine = (files: any) => {
        if (files.length === 1) {
            return <span>{files.length} data file</span>
        }
        return <span>{files.length} data files</span>
    }

    public render() {
        const { metadata, ddo } = this.props
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
                        <span
                            title={`Date created, published on ${
                                base.datePublished
                            }`}
                        >
                            <Moment
                                date={base.dateCreated}
                                format="L"
                                interval={0}
                            />
                        </span>

                        {base.categories && (
                            // TODO: Make this link to search for respective category
                            <Link to={`/search?text=${base.categories[0]}`}>
                                {base.categories[0]}
                            </Link>
                        )}

                        {base.files && this.datafilesLine(base.files)}
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
                            <strong>DID</strong>
                        </span>
                        <span className={styles.metaValue}>
                            <code>{ddo.id}</code>
                        </span>
                    </li>
                </ul>

                <AssetFilesDetails
                    files={base.files ? base.files : []}
                    ddo={ddo}
                />

                {/* <pre>
                    <code>{JSON.stringify(metadata, null, 2)}</code>
                </pre> */}
            </>
        )
    }
}
