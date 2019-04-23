import React, { PureComponent, ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { DDO, MetaData, File } from '@oceanprotocol/squid'
import Input from '../../components/atoms/Form/Input'
import Markdown from '../../components/atoms/Markdown'
import styles from './AssetDetails.module.scss'
import AssetFilesDetails from './AssetFilesDetails'
import Button from '../../components/atoms/Button'

const { steps } = require('../../data/form-publish.json') // eslint-disable-line

interface AssetDetailsProps {
    metadata: MetaData
    ddo: DDO
}

interface AssetDetailsState {
    isEditMode?: boolean
    isLoading?: boolean
    dateCreated?: string
    description?: string
    copyrightHolder?: string
    categories?: string
}

export default class AssetDetails extends PureComponent<
    AssetDetailsProps,
    AssetDetailsState
> {
    public state = {
        isEditMode: false,
        isLoading: false
    }

    private inputChange = (
        event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
    ) => {
        this.setState({
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    private toggleEditMode = () => {
        this.setState({ isEditMode: !this.state.isEditMode })
    }

    private updateAsset = () => {
        this.setState({ isLoading: true })
        // TODO: update asset metadata
    }

    private retireAsset = () => {
        this.setState({ isLoading: true })
        // TODO: retire asset
    }

export function datafilesLine(files: File[]) {
    if (files.length === 1) {
        return <span>{files.length} data file</span>
    }
    return <span>{files.length} data files</span>
}

export default class AssetDetails extends PureComponent<AssetDetailsProps> {
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

                        {base.categories &&
                            (this.state.isEditMode ? (
                                <Input
                                    name={Object.keys(steps[1].fields)[1]}
                                    label={steps[1].fields.categories.label}
                                    placeholder={
                                        steps[1].fields.categories.placeholder
                                    }
                                    required={
                                        steps[1].fields.categories.required
                                    }
                                    type={steps[1].fields.categories.type}
                                    onChange={this.inputChange}
                                    options={steps[1].fields.categories.options}
                                    value={base.categories[0]}
                                />
                            ) : (
                                // TODO: Make this link to search for respective category
                                <Link to={`/search?text=${base.categories[0]}`}>
                                    {base.categories[0]}
                                </Link>
                            ))}

                        {base.files && datafilesLine(base.files)}
                    </div>
                </aside>

                {this.state.isEditMode ? (
                    <Input
                        name={Object.keys(steps[1].fields)[0]}
                        label={steps[1].fields.description.label}
                        placeholder={steps[1].fields.description.placeholder}
                        required={steps[1].fields.description.required}
                        type={steps[1].fields.description.type}
                        onChange={this.inputChange}
                        rows={10}
                        value={base.description}
                    />
                ) : (
                    <Markdown
                        text={base.description}
                        className={styles.description}
                    />
                )}

                <div className={styles.metadataActions}>
                    {this.state.isEditMode ? (
                        <Button primary onClick={this.toggleEditMode}>
                            Save Changes
                        </Button>
                    ) : (
                        <>
                            <Button link onClick={this.toggleEditMode}>
                                Edit Metadata
                            </Button>

                            <Button link onClick={this.retireAsset}>
                                Retire Asset
                            </Button>
                        </>
                    )}
                </div>

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
            </>
        )
    }
}
