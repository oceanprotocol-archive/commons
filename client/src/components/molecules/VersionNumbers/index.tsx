import React, { PureComponent } from 'react'
import {
    OceanPlatformVersions,
    OceanPlatformTechStatus,
    Logger
} from '@oceanprotocol/squid'
import axios from 'axios'
import { version } from '../../../../package.json'
import styles from './index.module.scss'

import { faucetUri } from '../../../config'
import { User } from '../../../context'

import VersionTable from './VersionTable'

export const commonsVersion =
    process.env.NODE_ENV === 'production' ? version : `${version}-dev`

interface VersionNumbersProps {
    minimal?: boolean
}

export interface VersionNumbersState extends OceanPlatformVersions {
    commons: {
        name: string
        version: string
    }
    faucet: {
        name: string
        version: string
        status: OceanPlatformTechStatus
    }
}

export default class VersionNumbers extends PureComponent<
    VersionNumbersProps,
    VersionNumbersState
> {
    public static contextType = User

    public state: VersionNumbersState = {
        commons: {
            name: 'Commons',
            version: commonsVersion
        },
        faucet: {
            name: 'Faucet',
            version: '',
            status: OceanPlatformTechStatus.Loading
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
        }
    }

    // for canceling axios requests
    public signal = axios.CancelToken.source()

    public componentDidMount() {
        this.getOceanVersions()
    }

    public componentWillUnmount() {
        this.signal.cancel()
    }

    private async getOceanVersions() {
        const { ocean } = this.context
        const { versions } = ocean
        const componentVersions = versions && (await versions.get())
        const { squid, brizo, aquarius } = componentVersions
        console.log(componentVersions)

        // const faucet = await this.getData(faucetUri)

        this.setState({
            commons: { ...this.state.commons },
            squid,
            brizo,
            aquarius
            // faucet
        })
        console.log(this.state)
    }

    private async getData(uri: string) {
        try {
            const response = await axios.get(uri, {
                headers: { Accept: 'application/json' },
                cancelToken: this.signal.token
            })

            // fail silently
            if (response.status !== 200) return

            return response.data
        } catch (error) {
            !axios.isCancel(error) && Logger.error(error.message)
        }
    }

    public render() {
        const { minimal } = this.props
        const { commons, squid, brizo, aquarius } = this.state

        const mimimalOutput = `${squid.name} v${squid.version}\n${
            brizo.name
        } v${brizo.version}\n${aquarius.name} v${aquarius.version}`

        return minimal ? (
            <p className={styles.versionsMinimal}>
                <a title={mimimalOutput} href={'/about'}>
                    v{commons.version} {brizo.network && `(${brizo.network})`}
                </a>
            </p>
        ) : (
            <div className={styles.versions} id="#oceanversions">
                <h2 className={styles.versionsTitle}>
                    Ocean Components in use
                </h2>
                <VersionTable data={this.state} />
            </div>
        )
    }
}
