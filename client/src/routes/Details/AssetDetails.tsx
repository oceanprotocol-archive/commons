import React, { PureComponent, ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { DDO, MetaData, File, Logger } from '@oceanprotocol/squid'
import Input from '../../components/atoms/Form/Input'
import Markdown from '../../components/atoms/Markdown'
import styles from './AssetDetails.module.scss'
import AssetFilesDetails from './AssetFilesDetails'
import Button from '../../components/atoms/Button'
import Spinner from '../../components/atoms/Spinner'
import { serviceHost, servicePort, serviceScheme } from '../../config'

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
    feedback?: string
}

export default class AssetDetails extends PureComponent<
    AssetDetailsProps,
    AssetDetailsState
> {
    public state = {
        isEditMode: false,
        isLoading: false,
        feedback: '',
        dateCreated: this.props.metadata.base.dateCreated,
        description: this.props.metadata.base.description,
        copyrightHolder: this.props.metadata.base.copyrightHolder,
        categories: this.props.metadata.base.categories
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

    private fetch = async (method: string, body: any) => {
        try {
            const response = await fetch(
                `${serviceScheme}://${serviceHost}:${servicePort}/api/v1/ddo/${
                    this.props.ddo
                }`,
                {
                    method,
                    body: JSON.stringify({ body }),
                    headers: { 'Content-Type': 'application/json' }
                }
            )
            const json = await response.json()

            if (json && json.status === 'error') {
                this.setState({ feedback: json.message })
            }
        } catch (error) {
            Logger.error(error)
            this.setState({ feedback: error.message })
        }
    }

    private updateAsset = async () => {
        this.setState({ isLoading: true, feedback: 'Updating asset...' })

        const {
            dateCreated,
            description,
            copyrightHolder,
            categories
        } = this.state

        const body = {
            metadata: {
                base: {
                    dateCreated,
                    description,
                    copyrightHolder,
                    categories
                }
            },
            signature: ''
        }

        await this.fetch('PUT', body)
        this.setState({ isLoading: false })
    }

    private retireAsset = async () => {
        this.setState({ isLoading: true, feedback: 'Retiring asset...' })

        const body = {
            signature: ''
        }

        await this.fetch('DELETE', body)
        this.setState({ isLoading: false })
    }

    private renderDatafilesLine = (files: any) =>
        files.length === 1 ? (
            <span>{files.length} data file</span>
        ) : (
            <span>{files.length} data files</span>
        )

    private Date = ({ value }: { value: string }) =>
        this.state.isEditMode ? (
            <Input
                name={'dateCreated'}
                label={steps[1].fields.dateCreated.label}
                placeholder={steps[1].fields.dateCreated.placeholder}
                required={steps[1].fields.dateCreated.required}
                type={steps[1].fields.dateCreated.type}
                onChange={this.inputChange}
                value={value}
                disabled={this.state.isLoading}
            />
        ) : (
            <Moment date={value} format="L" interval={0} />
        )

    private Category = ({ value }: { value: string }) =>
        this.state.isEditMode ? (
            <Input
                name={'categories'}
                label={steps[1].fields.categories.label}
                placeholder={steps[1].fields.categories.placeholder}
                required={steps[1].fields.categories.required}
                type={steps[1].fields.categories.type}
                onChange={this.inputChange}
                options={steps[1].fields.categories.options}
                value={value}
                disabled={this.state.isLoading}
            />
        ) : (
            // TODO: Make this link to search for respective category
            <Link to={`/search?text=${value}`}>{value}</Link>
        )

    private Description = ({ value }: { value: string }) =>
        this.state.isEditMode ? (
            <Input
                name={'description'}
                label={steps[1].fields.description.label}
                placeholder={steps[1].fields.description.placeholder}
                required={steps[1].fields.description.required}
                type={steps[1].fields.description.type}
                onChange={this.inputChange}
                rows={10}
                value={value}
                disabled={this.state.isLoading}
            />
        ) : (
            <Markdown text={value} className={styles.description} />
        )

    private MetadataActions = () => (
        <div className={styles.metadataActions}>
            {this.state.isEditMode ? (
                this.state.isLoading ? (
                    <Spinner message={this.state.feedback} />
                ) : (
                    <>
                        <Button primary onClick={this.updateAsset}>
                            Save Changes
                        </Button>

                        {this.state.feedback !== '' && (
                            <div>{this.state.feedback}</div>
                        )}
                    </>
                )
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
    )

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
                            <this.Date value={base.dateCreated} />
                        </span>

                        {base.categories && (
                            <this.Category value={base.categories[0]} />
                        )}

                        {base.files && this.renderDatafilesLine(base.files)}
                    </div>
                </aside>

                <this.Description value={base.description} />

                <this.MetadataActions />

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
