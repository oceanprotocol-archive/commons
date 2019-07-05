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
import { User } from '../../../context'

import VersionTable from './VersionTable'
import VersionStatus from './VersionStatus'

// construct values which are not part of any response
export const commonsVersion =
    process.env.NODE_ENV === 'production' ? version : `${version}-dev`
const commonsNetwork = new URL(nodeUri).hostname.split('.')[0]
const faucetNetwork = new URL(faucetUri).hostname.split('.')[1]

interface VersionNumbersProps {
    minimal?: boolean
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

    // define a minimal default state to fill UI
    public state: VersionNumbersState = {
        commons: {
            name: 'Commons',
            network: commonsNetwork,
            version: commonsVersion
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
            network: faucetNetwork,
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

    public async componentDidMount() {
        this.getOceanVersions()
        this.getFaucetVersion()
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

            this.setState({
                ...this.state,
                faucet: {
                    ...this.state.faucet,
                    version: response.data.version,
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
            <p className={styles.versionsMinimal}>
                <a
                    title={`${squid.name} v${squid.version}\n${brizo.name} v${brizo.version}\n${aquarius.name} v${aquarius.version}`}
                    href={'/about'}
                >
                    v{commons.version} {squid.network && `(${squid.network})`}
                </a>
            </p>
        )
    }

    public render() {
        const { minimal } = this.props

        return minimal ? (
            <this.MinimalOutput />
        ) : (
            <div className={styles.versions} id="#oceanversions">
                <h2 className={styles.versionsTitle}>
                    Ocean Components Status
                </h2>
                <VersionStatus status={this.state.status} />
                <VersionTable data={this.state} />
            </div>
        )
    }
}
