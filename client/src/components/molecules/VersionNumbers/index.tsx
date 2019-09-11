import React, { PureComponent } from 'react'
import {
    OceanPlatformVersions,
    OceanPlatformTechStatus,
    Logger
} from '@oceanprotocol/squid'
import axios from 'axios'
import { version } from '../../../../package.json'
import styles from './index.module.scss'

import { nodeUri, faucetUri } from '../../../config'
import { User, Market } from '../../../context'

import VersionTable from './VersionTable'
import VersionStatus from './VersionStatus'

interface VersionNumbersProps {
    minimal?: boolean
    account: string
}

export interface VersionNumbersState extends OceanPlatformVersions {
    commons: {
        name: string
        version: string
        network: string
    }
    faucet: {
        name: string
        version: string
        network: string
        status: OceanPlatformTechStatus
    }
}

export default class VersionNumbers extends PureComponent<
    VersionNumbersProps,
    VersionNumbersState
> {
    public static contextType = User

    // construct values which are not part of any response
    public commonsVersion =
        process.env.NODE_ENV === 'production' ? version : `${version}-dev`

    public commonsNetwork = faucetUri.includes('localhost')
        ? 'Spree'
        : new URL(nodeUri).hostname.split('.')[0]

    // define a minimal default state to fill UI
    public state: VersionNumbersState = {
        commons: {
            name: 'Commons',
            network: this.commonsNetwork,
            version: this.commonsVersion
        },
        squid: {
            name: 'Squid-js',
            status: OceanPlatformTechStatus.Loading
        },
        aquarius: {
            name: 'Aquarius',
            status: OceanPlatformTechStatus.Loading
        },
        brizo: {
            name: 'Brizo',
            status: OceanPlatformTechStatus.Loading
        },
        faucet: {
            name: 'Faucet',
            version: '',
            network: '',
            status: OceanPlatformTechStatus.Loading
        },
        status: {
            ok: false,
            network: false,
            contracts: false
        }
    }

    // for canceling axios requests
    public signal = axios.CancelToken.source()

    public componentDidMount() {
        this.getOceanVersions()
        this.getFaucetVersion()
    }

    public async componentDidUpdate(prevProps: any) {
        // Workaround: Using account prop instead of getting it from
        // context to be able to compare. Cause there is no `prevContext`.
        if (prevProps.account !== this.props.account) {
            this.getOceanVersions()
            this.getFaucetVersion()
        }
    }

    public componentWillUnmount() {
        this.signal.cancel()
    }

    private async getOceanVersions() {
        const { ocean } = this.context
        // wait until ocean object is properly populated
        if (ocean.versions === undefined) return

        const response = await ocean.versions.get()
        const { squid, brizo, aquarius, status } = response

        this.setState({
            ...this.state,
            squid,
            brizo,
            aquarius,
            status
        })
    }

    private async getFaucetVersion() {
        try {
            const response = await axios.get(faucetUri, {
                headers: { Accept: 'application/json' },
                cancelToken: this.signal.token
            })

            // fail silently
            if (response.status !== 200) return

            const { version, network } = response.data

            this.setState({
                ...this.state,
                faucet: {
                    ...this.state.faucet,
                    version,
                    network,
                    status: OceanPlatformTechStatus.Working
                }
            })
        } catch (error) {
            !axios.isCancel(error) && Logger.error(error.message)
        }
    }

    private MinimalOutput = () => {
        const { commons, squid, brizo, aquarius } = this.state

        return (
            <Market.Consumer>
                {market => (
                    <p className={styles.versionsMinimal}>
                        <a
                            title={`${squid.name} v${squid.version}\n${brizo.name} v${brizo.version}\n${aquarius.name} v${aquarius.version}`}
                            href="/about"
                        >
                            v{commons.version}{' '}
                            {market.network && `(${market.network})`}
                        </a>
                    </p>
                )}
            </Market.Consumer>
        )
    }

    public render() {
        const { minimal } = this.props

        return minimal ? (
            <this.MinimalOutput />
        ) : (
            <>
                <h2 className={styles.versionsTitle} id="#oceanversions">
                    Ocean Components Status
                </h2>
                <VersionStatus status={this.state.status} />
                <VersionTable data={this.state} />
            </>
        )
    }
}
