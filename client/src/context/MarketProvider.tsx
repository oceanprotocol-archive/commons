import React, { PureComponent } from 'react'
import { Logger, Ocean, DDO } from '@oceanprotocol/squid'
import OPWallet from 'op-web3-wallet'
import { Market, User } from '.'
import formPublish from '../data/form-publish.json'
import { nodeUri, aquariusUri, brizoUri, brizoAddress, secretStoreUri, verbose } from '../config'

const categories =
    (formPublish.steps[1].fields &&
        formPublish.steps[1].fields.categories &&
        formPublish.steps[1].fields.categories.options) ||
    []

const oceanOpts = {
    nodeUri,
    aquariusUri,
    brizoUri,
    brizoAddress,
    secretStoreUri,
    verbose
}

interface MarketProviderProps {
    ocean: Ocean
}

interface MarketProviderState {
    totalAssets: number
    categories: string[]
    network: string
    networkMatch: boolean
    aquarius: {
        queryMetadata: (query: any) => Promise<any>
        retrieveDDO: (did: string) => Promise<DDO>
    },
    ocean: Ocean | undefined
}

export default class MarketProvider extends PureComponent<
    MarketProviderProps,
    MarketProviderState
> {
    public static contextType = User

    constructor(props: MarketProviderProps) {
        super(props);
        this.state = {
            totalAssets: 0,
            categories,
            network: 'Pacific',
            networkMatch: false,
            aquarius: {
                queryMetadata: this.queryMetadata,
                retrieveDDO: this.retrieveDDO
            },
            ocean: undefined

        }
    }

    public async componentDidMount() {
        await this.checkCorrectUserNetwork()
        const { ocean } = this.context
        this.setState({ ocean })
    }

    public async componentDidUpdate(prevProps: any) {
        // Using ocean prop instead of getting it from context to be able to compare.
        // Cause there is no `prevContext`.
        if (prevProps.ocean !== this.props.ocean) {
            await this.getTotalAssets()
            await this.getMarketNetwork()
            await this.checkCorrectUserNetwork()
        }
    }

    private getTotalAssets = async () => {
        const searchQuery = {
            offset: 1,
            page: 1,
            query: {},
            sort: {
                value: 1
            }
        }

        try {
            const { ocean } = this.props
            if (ocean) {
                const search = await ocean.assets.query(searchQuery)
                this.setState({ totalAssets: search.totalResults })
            }
        } catch (error) {
            Logger.error('Error', error.message)
        }
    }

    private getMarketNetwork = async () => {
        try {
            const { ocean } = this.props
            if (ocean) {
                // Set desired network to whatever Brizo is running in
                const brizo = await ocean.brizo.getVersionInfo()
                const network =
                    brizo.network.charAt(0).toUpperCase() + brizo.network.slice(1)
                this.setState({ network })
            }
        } catch (error) {
            Logger.error('Error', error.message)
        }
    }

    private async checkCorrectUserNetwork() {
        if (this.context.network === this.state.network) {
            this.setState({ networkMatch: true })
        } else {
            this.setState({ networkMatch: false })
        }
    }

    private queryMetadata = async (query: any): Promise<any> => {
        try {
            const result = await OPWallet.OceanUtils.queryMetadata(query, oceanOpts);
            console.log('query Metadata result', result)
            return result;
        } catch(error) {
            throw new Error(`ERROR in retrieveDDO ${error}`)
        }

    }

    private retrieveDDO = async (did: string): Promise<DDO> => {
        try {
            const ddo = await OPWallet.OceanUtils.retrieveDDO(did, oceanOpts);
            console.log('DDO result', ddo)
            return ddo as DDO;
        } catch(error) {
            throw new Error(`ERROR in retrieveDDO ${error}`)
        }
    }

    public render() {
        return (
            <Market.Provider value={this.state}>
                {this.props.children}
            </Market.Provider>
        )
    }
}
