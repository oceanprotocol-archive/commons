import React, { PureComponent } from 'react'
import Moment from 'react-moment'
import { DDO, MetaData, File } from '@oceanprotocol/squid'
import axios from 'axios'
import Markdown from '../../atoms/Markdown'
import CategoryLink from '../../atoms/CategoryLink'
import Button from '../../atoms/Button'
import styles from './AssetDetails.module.scss'
import { Logger } from '@oceanprotocol/squid'
import { aquariusUri } from '../../../config'

interface AssetDetailsProps {
    metadata: MetaData
    ddo: DDO
}

export function datafilesLine(files: File[]) {
    if (files.length === 1) {
        return <span>{files.length} data file</span>
    }
    return <span>{files.length} data files</span>
}

export default class AssetDetails extends PureComponent<AssetDetailsProps> {

    // for canceling axios requests
    public signal = axios.CancelToken.source()

    private disableAsset = async () => {
        try {
            await axios({
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                url: `${aquariusUri}/api/v1/aquarius/assets/ddo/${this.props.ddo.id}`,
                cancelToken: this.signal.token
            })
            window.location.reload();
        } catch (error) {
            !axios.isCancel(error) && Logger.error(error.message)
        }
    }

    public componentWillUnmount() {
        this.signal.cancel()
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
                            title={`Date created, published on ${base.datePublished}`}
                        >
                            <Moment
                                date={base.dateCreated}
                                format="L"
                                interval={0}
                            />
                        </span>

                        {base.categories && (
                            <CategoryLink category={base.categories[0]} />
                        )}

                        {base.files && datafilesLine(base.files)}
                    </div>
                </aside>

                {base.description && (
                    <Markdown
                        text={base.description}
                        className={styles.description}
                    />
                )}

                <div className={styles.metaFixed}>
                    <h2
                        className={styles.metaFixedTitle}
                        title="This metadata can not be changed because it is used to generate the checksums for the DDO, and to encrypt the file urls."
                    >
                        Fixed Metadata
                    </h2>
                    <ul>
                        <li>
                            <span className={styles.metaLabel}>
                                <strong>Author</strong>
                            </span>
                            <span className={styles.metaValue}>
                                {base.author}
                            </span>
                        </li>
                        <li>
                            <span className={styles.metaLabel}>
                                <strong>License</strong>
                            </span>
                            <span className={styles.metaValue}>
                                {base.license}
                            </span>
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
                </div>

                <pre>
                    <code>{JSON.stringify(metadata, null, 2)}</code>
                </pre>

                <div>
                    <h2
                        title="Administrative actions for this asset."
                    >
                        Actions
                    </h2>

                    <Button primary onClick={this.disableAsset}>
                        Disable asset
                    </Button>

                </div>
            </>
        )
    }
}
