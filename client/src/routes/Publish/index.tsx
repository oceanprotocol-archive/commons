import React, { ChangeEvent, Component, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Logger, File } from '@oceanprotocol/squid'
import Web3 from 'web3'
import { BigNumber as BN } from 'bignumber.js'
import { Slider, Text } from 'rimble-ui'
import Route from '../../components/templates/Route'
import Form from '../../components/atoms/Form/Form'
import Input from '../../components/atoms/Form/Input'
import AssetModel from '../../models/AssetModel'
import { User, Market } from '../../context'
import Step from './Step'
import Progress from './Progress'
// import ReactGA from 'react-ga'
import { allowPricing, marketplaceId } from '../../config'
import { steps } from '../../data/form-publish.json'
import Content from '../../components/atoms/Content'
import BondingCurve from '../../components/templates/BondingCurve'
import { BondingCurveTypes, BondingCurveSettings } from '../../components/templates/BondingCurve/Settings'
import { ReactComponent as Caret } from '../../img/caret.svg'
import styles from './index.module.scss'

// import withTracker from '../../hoc/withTracker'

type AssetType = 'dataset' | 'algorithm' | 'container' | 'workflow' | 'other'

interface Tag {
    id: number,
    name: string,
    disabled?: boolean
}

interface PublishState {
    name?: string
    dateCreated?: string
    price?: string
    author?: string
    license?: string
    description?: string
    files?: File[]
    type?: AssetType
    copyrightHolder?: string
    categories?: string
    workExample?: string
    links?: File[]
    inLanguage?: string

    crowdsource?: boolean
    updateFrequency?: string
    pricingMechanism?: string
    bondingCurve?: string
    showPricingConfig?: boolean
    reserveRatio?: string

    currentStep?: number
    publishingStep?: number
    isPublishing?: boolean
    isPublished?: boolean
    publishedDid?: string
    publishingError?: string
    validationStatus?: any
    tags?: Array<Tag>
    tagSuggestions?: Array<Tag>
}

class Publish extends Component<{}, PublishState> {
    public static contextType = User

    public state = {
        name: '',
        dateCreated: new Date().toISOString(),
        description: '',
        files: [],
        price: '0',
        author: '',
        type: 'dataset' as AssetType,
        license: '',
        copyrightHolder: '',
        categories: '',
        workExample: undefined,
        links: [],
        inLanguage: 'English',

        crowdsource: false,
        updateFrequency: 'Seldom',
        // pricingMechanism: 'Flat',
        pricingMechanism: 'Bonding Curve',
        bondingCurve: 'standard',
        showPricingConfig: false,
        reserveRatio: "90",

        currentStep: 1,
        isPublishing: false,
        isPublished: false,
        publishedDid: '',
        publishingError: '',
        publishingStep: 0,
        validationStatus: {
            1: {
                assetType: false, 
                name: false,
                pricingMechanism: false,
                price: false,
                allFieldsValid: false
            },
            2: {
                files: false,
                description: false,
                categories: false,
                allFieldsValid: false
            },
            3: {
                author: false,
                copyrightHolder: false,
                license: false,
                allFieldsValid: false
            }
        },
        tags: [],
        tagSuggestions: [{id: 1, name: 'opendata'}, {id: 2, name: 'timeseries'}]
    }

    private inputChange = (
        event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
    ) => {
        this.validateInputs(event.currentTarget.name, event.currentTarget.value)

        this.setState({
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    private handleAddition = (tag: any) => {
        const { tags } = this.state
        let newTags = []
        if (tags) {
            newTags = [].concat(tags, tag)
        } else {
            newTags.push(tag)
        }
        this.setState({ tags: newTags });
    }

    private handleDelete = (i: number) => {
        const tags = this.state.tags.slice(0)
        tags.splice(i, 1)
        this.setState({ tags })
    }

    private next = () => {
        let { currentStep } = this.state
        const totalSteps = steps.length

        currentStep =
            currentStep >= totalSteps - 1 ? totalSteps : currentStep + 1

        // ReactGA.event({
        //     category: 'Publish',
        //     action: 'nextStep ' + currentStep
        // })

        this.setState({ currentStep, showPricingConfig: false })
    }

    private prev = () => {
        let { currentStep } = this.state
        currentStep = currentStep <= 1 ? 1 : currentStep - 1
        this.setState({ currentStep, showPricingConfig: false })
    }

    private tryAgain = () => {
        this.setState({ publishingError: '' })
    }

    private toStart = () => {
        this.setState({
            name: '',
            dateCreated: new Date().toISOString(),
            description: '',
            files: [],
            price: '0',
            author: '',
            type: 'dataset' as AssetType,
            license: '',
            copyrightHolder: '',
            categories: '',
            isPublishing: false,
            isPublished: false,
            publishingStep: 0,
            currentStep: 1,
            showPricingConfig: false
        })
    }

    private validateInputs = (name: string, value: string) => {
        const hasContent = value.length > 0

        // Setting state for all fields
        if (hasContent) {
            this.setState(
                prevState => ({
                    validationStatus: {
                        ...prevState.validationStatus,
                        [this.state.currentStep]: {
                            ...prevState.validationStatus[
                                this.state.currentStep
                            ],
                            [name]: true
                        }
                    }
                }),
                this.runValidation
            )
        } else {
            this.setState(
                prevState => ({
                    validationStatus: {
                        ...prevState.validationStatus,
                        [this.state.currentStep]: {
                            ...prevState.validationStatus[
                                this.state.currentStep
                            ],
                            [name]: false
                        }
                    }
                }),
                this.runValidation
            )
        }
    }

    private runValidation = () => {
        const { validationStatus } = this.state
        //
        // Step 1
        //
        if (validationStatus[1].assetType && validationStatus[1].name && 
            validationStatus[1].pricingMechanism && validationStatus[1].price) {
            this.setState(prevState => ({
                validationStatus: {
                    ...prevState.validationStatus,
                    1: {
                        ...prevState.validationStatus[1],
                        allFieldsValid: true
                    }
                }
            }))
        } else {
            this.setState(prevState => ({
                validationStatus: {
                    ...prevState.validationStatus,
                    1: {
                        ...prevState.validationStatus[1],
                        allFieldsValid: false
                    }
                }
            }))
        }

        //
        // Step 2
        //
        if (validationStatus[2].files && validationStatus[2].description && 
            validationStatus[2].categories) {
            this.setState(prevState => ({
                validationStatus: {
                    ...prevState.validationStatus,
                    2: {
                        ...prevState.validationStatus[2],
                        allFieldsValid: true
                    }
                }
            }))
        } else {
            this.setState(prevState => ({
                validationStatus: {
                    ...prevState.validationStatus,
                    2: {
                        ...prevState.validationStatus[2],
                        allFieldsValid: false
                    }
                }
            }))
        }

        //
        // Step 3
        //
        if (
            validationStatus[3].author &&
            validationStatus[3].copyrightHolder &&
            validationStatus[3].license
        ) {
            this.setState(prevState => ({
                validationStatus: {
                    ...prevState.validationStatus,
                    3: {
                        ...prevState.validationStatus[3],
                        allFieldsValid: true
                    }
                }
            }))
        } else {
            this.setState(prevState => ({
                validationStatus: {
                    ...prevState.validationStatus,
                    3: {
                        ...prevState.validationStatus[3],
                        allFieldsValid: false
                    }
                }
            }))
        }
    }

    private buildAssetSchema = () => {
        // remove `found` attribute from all File objects
        // in a new array
        const files = this.state.files.map(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            ({ found, ...keepAttrs }: { found: boolean }) => keepAttrs
        )

        return {
            // OEP-08 Attributes
            // https://github.com/oceanprotocol/OEPs/tree/master/8
            attributes: {
                main: Object.assign(AssetModel.main, {
                    type: this.state.type.toLowerCase(),
                    name: this.state.name,
                    dateCreated:
                        new Date(this.state.dateCreated)
                            .toISOString()
                            .split('.')[0] + 'Z', // remove milliseconds
                    author: this.state.author,
                    license: this.state.license,
                    price: allowPricing
                        ? Web3.utils.toWei(this.state.price, 'ether')
                        : this.state.price,
                    files
                }),
                // additionalInformation: Object.assign(
                //     AssetModel.additionalInformation,
                //     {
                //         description: this.state.description,
                //         copyrightHolder: this.state.copyrightHolder,
                //         categories: categories,
                //         tags: this.state.tags.map((tag: Tag) => tag.name.toLowerCase()),
                //         workExample: this.state.workExample,
                //         links: this.state.links,
                //         inLanguage: this.state.inLanguage
                //     }
                // )
                additionalInformation: {
                    description: this.state.description,
                    copyrightHolder: this.state.copyrightHolder,
                    categories: [
                        this.state.categories,
                        marketplaceId
                    ],
                    tags: this.state.tags.map((tag: Tag) => tag.name.toLowerCase()),
                    workExample: this.state.workExample,
                    links: this.state.links,
                    inLanguage: this.state.inLanguage,
                    // Custom marketplace fields
                    updateFrequency: this.state.updateFrequency,
                    crowdsource: this.state.crowdsource,
                    pricingMechanism: this.state.pricingMechanism
                }
            }
        }

    }

    private registerAsset = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // ReactGA.event({ category: 'Publish', action: 'registerAsset-start' })

        this.setState({
            publishingError: '',
            isPublishing: true,
            publishingStep: 0
        })

        // const { ocean } = this.context
        // const account = await ocean.accounts.list()
        const { wallet } = this.context

        const newAsset = this.buildAssetSchema().attributes

        wallet.toggleModal()
        try {
            // const asset = await this.context.ocean.assets
            //     .create(newAsset, account[0])
            //     .next((publishingStep: number) =>
            //         this.setState({ publishingStep })
            //     )
            const asset = await wallet.publishAsset(newAsset)

            this.setState({
                publishedDid: asset.id,
                isPublished: true
            })
            wallet.toggleModal()

            // ReactGA.event({
            //     category: 'Publish',
            //     action: `registerAsset-end ${asset.id}`
            // })
        } catch (error) {
            wallet.toggleModal()
            // make readable errors
            Logger.error('error:', error.message)
            this.setState({ publishingError: error.message })

            // ReactGA.event({
            //     category: 'Publish',
            //     action: `registerAsset-error ${error.message}`
            // })
        }

        this.setState({ isPublishing: false })
    }

    private renderPricingMechanismSettings = () => {
        const { pricingMechanism, showPricingConfig, reserveRatio } = this.state
        return (
            <>
                {pricingMechanism === 'Bonding Curve' && (
                    <>
                        <Input
                            name="bondingCurve"
                            label="Bonding Curve Type"
                            required
                            type="select"
                            help="Select a Bonding Curve Setting"
                            keys={Object.keys(BondingCurveTypes)}
                            sort={false}
                            options={Object.values(BondingCurveTypes)}
                            onChange={this.inputChange}
                            value={this.state.bondingCurve}
                        />
                       <input
                            type="button"
                            className={styles.toggle}
                            onClick={event => this.setState({ showPricingConfig: !this.state.showPricingConfig })}
                            // title="Show Advance Config Settings"
                            value={!this.state.showPricingConfig ? "Show Bonding Curve Advance Settings >":"Hide Bonding Curve Advance Settings <"}
                        />{/*
                            <Caret
                                className={showPricingConfig ? styles.open : ''}
                            />{' '}
                            Bonding Curve Advance Settings
                        </input>*/}
                        {showPricingConfig && (
                            <div>
                                {<div className={styles.link}>
                                    <span>
                                        Not sure about the pricing model?
                                        <Link
                                            to={`/playground`}
                                            target="_blank"
                                        >  Open the Economics Playground</Link>
                                    </span>
                                </div>}
                                <div>
                                    <Slider min={"1"} max={"100"} step={"1"} 
                                        name="reserveRatio" 
                                        value={reserveRatio} 
                                        // onChange={this.inputChange}
                                    />
                                    <Text.span fontWeight={"bold"}>{reserveRatio} %</Text.span>
                                </div>
                                <BondingCurve
                                    contractAddress={(BondingCurveSettings as any)[this.state.bondingCurve].contractAddress}
                                    contractArtifact={(BondingCurveSettings as any)[this.state.bondingCurve].artifact}
                                    defaultTab="bonding-curve"
                                    readOnly
                                    onError={(error: any) => console.log('ERROR in bonding curve', error)}
                                    onLoaded={() => console.log('BondingCurve loaded')}
                                    curveParams={{
                                        curveType: this.state.bondingCurve,
                                        reserveRatio: (new BN(this.state.reserveRatio)).div(new BN(100)),
                                        curveHeight: new BN(5000), // a
                                        inflectionSupply: new BN(15000), // b 
                                        steepness: new BN(1000000), // c
                                    }}
                                />
                            </div>
                        )}
                    </>
                )}
                <br />
            </>
        )
    }

    public render() {
        return (
            <Market.Consumer>
                {market => (
                    <Route
                        title="Publish"
                        description={`Publish a new Data Asset`}
                    >
                        <Content>
                            <Progress
                                steps={steps}
                                currentStep={this.state.currentStep}
                            />

                            <Form onSubmit={this.registerAsset}>
                                {steps.map((step: any, index: number) => (
                                    <Step
                                        key={index}
                                        index={index}
                                        title={step.title}
                                        description={step.description}
                                        currentStep={this.state.currentStep}
                                        fields={step.fields}
                                        inputChange={this.inputChange}
                                        state={this.state}
                                        next={this.next}
                                        prev={this.prev}
                                        totalSteps={steps.length}
                                        tryAgain={this.tryAgain}
                                        toStart={this.toStart}
                                        content={step.content}
                                        handleAddition={this.handleAddition}
                                        handleDelete={this.handleDelete}
                                        getAssetSchema={this.buildAssetSchema}
                                        renderPricingMechanismSettings={this.renderPricingMechanismSettings}
                                    />
                                ))}
                            </Form>
                        </Content>
                    </Route>
                )}
            </Market.Consumer>
        )
    }
}

// export default withTracker(Publish)
export default Publish
