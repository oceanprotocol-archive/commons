import React, { PureComponent, ChangeEvent } from 'react'
import Moment from 'react-moment'
import { DDO, MetaData, Logger } from '@oceanprotocol/squid'
import Input from '../../atoms/Form/Input'
import Markdown from '../../atoms/Markdown'
import { User } from '../../../context'
import CategoryLink from '../../atoms/CategoryLink'
import styles from './AssetDetails.module.scss'
import AssetFilesDetails from './AssetFilesDetails'
import Button from '../../atoms/Button'
import Spinner from '../../atoms/Spinner'
import Report from './Report'
import { serviceUri } from '../../../config'

const { steps } = require('../../../data/form-publish.json') // eslint-disable-line

export const renderDatafilesLine = (files: any) =>
    files.length === 1 ? (
        <span>{files.length} data file</span>
    ) : (
        <span>{files.length} data files</span>
    )

interface AssetDetailsProps {
    metadata: MetaData
    ddo: DDO
}

interface AssetDetailsState {
    isEditMode?: boolean
    isLoading?: boolean
    feedback?: string
    dateCreated?: string
    description?: string
    copyrightHolder?: string
    categories?: string[]
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

    private inputToArrayChange = (
        event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
    ) => {
        this.setState({
            [event.currentTarget.name]: [event.currentTarget.value]
        })
    }

    private toggleEditMode = () => {
        this.setState({ isEditMode: !this.state.isEditMode })
    }

    private cancelEditMode = () => {
        // reset everything
        this.setState({
            isEditMode: false,
            feedback: '',
            dateCreated: this.props.metadata.base.dateCreated,
            description: this.props.metadata.base.description,
            copyrightHolder: this.props.metadata.base.copyrightHolder,
            categories: this.props.metadata.base.categories
        })
    }

    private fetch = async (method: string, body: any) => {
        try {
            const response = await fetch(
                `${serviceUri}/api/v1/ddo/${this.props.ddo}`,
                {
                    method,
                    body: JSON.stringify({ body }),
                    headers: { 'Content-Type': 'application/json' }
                }
            )
            const json = await response.json()
            return json
        } catch (error) {
            Logger.error(error)
            return error
        }
    }

    private updateAsset = async () => {
        this.setState({ isLoading: true, feedback: 'Updating asset...' })

        const { web3, account } = this.context
        const { id } = this.props.ddo
        const {
            dateCreated,
            description,
            copyrightHolder,
            categories
        } = this.state

        const signature = await web3.eth.personal.sign(
            `You are updating ${id}`,
            account
        )

        const body = {
            metadata: {
                base: {
                    dateCreated,
                    description,
                    copyrightHolder,
                    categories
                }
            },
            signature
        }

        const response = await this.fetch('PUT', body)

        if (response.status !== 'success') {
            this.setState({ feedback: response.message, isLoading: false })
        } else {
            this.setState({ isEditMode: false, isLoading: false })
        }
    }

    private retireAsset = async () => {
        this.setState({ isLoading: true, feedback: 'Retiring asset...' })

        const { web3, account } = this.context
        const { id } = this.props.ddo

        const signature = await web3.eth.personal.sign(
            `You are retiring ${id}`,
            account
        )

        const body = { signature }

        const response = await this.fetch('DELETE', body)

        if (response.status !== 'success') {
            this.setState({ feedback: response.message })
        }

        this.setState({ isLoading: false })
    }

    private CopyrightHolder = ({ value }: { value: string }) =>
        this.state.isEditMode ? (
            <Input
                name={'copyrightHolder'}
                label={steps[2].fields.copyrightHolder.label}
                placeholder={steps[2].fields.copyrightHolder.placeholder}
                required={steps[2].fields.copyrightHolder.required}
                type={steps[2].fields.copyrightHolder.type}
                onChange={this.inputChange}
                value={value}
                disabled={this.state.isLoading}
                small
            />
        ) : (
            <h2 className={styles.copyrightHolder} title="Copyright Holder">
                {value}
            </h2>
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
                small
            />
        ) : (
            <Moment date={value} format="L" interval={0} />
        )

    private Category = ({ value }: { value: string[] }) =>
        this.state.isEditMode ? (
            <Input
                name={'categories'}
                label={steps[1].fields.categories.label}
                placeholder={steps[1].fields.categories.placeholder}
                required={steps[1].fields.categories.required}
                type={steps[1].fields.categories.type}
                onChange={this.inputToArrayChange}
                options={steps[1].fields.categories.options}
                value={value[0]}
                disabled={this.state.isLoading}
                small
            />
        ) : (
            // TODO: Make this link to search for respective category
            <CategoryLink category={value[0]} />
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

    private MetadataActions = () => {
        const isOwner = this.context.account === this.props.ddo.proof.creator
        if (!isOwner) {
            return null
        }

        return (
            <div className={styles.metadataActions}>
                {this.state.isEditMode ? (
                    <div className={styles.metadataActionEdit}>
                        {this.state.isLoading ? (
                            <Spinner message={this.state.feedback} />
                        ) : (
                            <>
                                <Button primary onClick={this.updateAsset}>
                                    Save Changes
                                </Button>
                                <Button link onClick={this.cancelEditMode}>
                                    Cancel
                                </Button>
                                {this.state.feedback !== '' && (
                                    <div>{this.state.feedback}</div>
                                )}
                            </>
                        )}
                    </div>
                ) : (
                    <>
                        <div>You are the owner of this asset</div>
                        <div>
                            <Button link onClick={this.toggleEditMode}>
                                Edit Metadata
                            </Button>
                            {/* TODO: Retire action needs loading/feedback */}
                            <Button link onClick={this.retireAsset}>
                                Retire Asset
                            </Button>
                        </div>
                    </>
                )}
            </div>
        )
    }

    public render() {
        const { metadata, ddo } = this.props
        const { base } = metadata
        const {
            isEditMode,
            copyrightHolder,
            dateCreated,
            categories,
            description
        } = this.state

        return (
            <>
                <aside className={styles.metaPrimary}>
                    {copyrightHolder && (
                        <this.CopyrightHolder value={copyrightHolder} />
                    )}

                    <div className={styles.metaPrimaryData}>
                        <span
                            title={`Date created, published on ${base.datePublished}`}
                        >
                            <this.Date value={dateCreated} />
                        </span>

                        {categories && <this.Category value={categories} />}
                        {/* base.categories && (
                            <CategoryLink category={base.categories[0]} />
                        ) */}
                        {base.files &&
                            !isEditMode &&
                            renderDatafilesLine(base.files)}
                    </div>
                </aside>

                {description && <this.Description value={description} />}

                <this.MetadataActions />

                <Report did={ddo.id} title={metadata.base.name} />

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

                <AssetFilesDetails
                    files={base.files ? base.files : []}
                    ddo={ddo}
                />
            </>
        )
    }
}

AssetDetails.contextType = User
