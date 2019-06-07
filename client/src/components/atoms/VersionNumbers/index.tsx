import React, { PureComponent } from 'react'
import { Logger } from '@oceanprotocol/squid'
import axios from 'axios'
import { version } from '../../../../package.json'
import { version as versionSquid } from '@oceanprotocol/squid/package.json'
import styles from './index.module.scss'

import {
    aquariusHost,
    aquariusPort,
    aquariusScheme,
    brizoHost,
    brizoPort,
    brizoScheme,
    faucetHost,
    faucetPort,
    faucetScheme
} from '../../../config'

import VersionTable from './VersionTable'

const commonsVersion =
    process.env.NODE_ENV === 'production' ? `v${version}` : `v${version}-dev`

interface VersionNumbersProps {
    minimal?: boolean
}

export interface VersionNumbersState {
    commons: {
        software: string
        version: string
    }
    squidJs: {
        software: string
        version: string
    }
    aquarius: {
        software: string
        version: string
    }
    brizo: {
        software: string
        version: string
        network: string
        'keeper-version': string
        'keeper-url': string
        contracts: any
    }
    keeperContracts: {
        software: string
        version: string
        contracts: any
    }
    faucet: {
        software: string
        version: string
    }
}

export default class VersionNumbers extends PureComponent<
    VersionNumbersProps,
    VersionNumbersState
> {
    public state = {
        commons: { software: 'Commons', version: commonsVersion },
        squidJs: {
            software: 'Squid-js',
            version: `v${versionSquid}`
        },
        aquarius: { software: 'Aquarius', version: '0.0.0' },
        brizo: {
            software: 'Brizo',
            version: '0.0.0',
            contracts: {} as any,
            network: '',
            'keeper-version': '0.0.0',
            'keeper-url': ''
        },
        keeperContracts: {
            software: 'Keeper Contracts',
            version: '0.0.0',
            contracts: {} as any,
            network: ''
        },
        faucet: { software: 'Faucet', version: '0.0.0' }
    }

    // for canceling axios requests
    public signal = axios.CancelToken.source()

    public componentWillMount() {
        this.setComponentVersions()
    }

    public componentWillUnmount() {
        this.signal.cancel()
    }

    private async setComponentVersions() {
        try {
            const aquarius = await this.getData(
                aquariusScheme,
                aquariusHost,
                aquariusPort
            )
            aquarius.version !== undefined && this.setState({ aquarius })

            const brizo = await this.getData(brizoScheme, brizoHost, brizoPort)
            brizo.version !== undefined &&
                this.setState({
                    brizo,
                    keeperContracts: {
                        ...this.state.keeperContracts,
                        version: brizo['keeper-version'],
                        contracts: brizo.contracts
                    }
                })

            const faucet = await this.getData(
                faucetScheme,
                faucetHost,
                faucetPort
            )

            faucet.version !== undefined && this.setState({ faucet })
        } catch (error) {
            !axios.isCancel(error) && Logger.error(error.message)
        }
    }

    private async getData(scheme: string, host: string, port: number | string) {
        const { data } = await axios.get(`${scheme}://${host}:${port}`, {
            headers: { Accept: 'application/json' },
            cancelToken: this.signal.token
        })
        return data
    }

    public render() {
        const { minimal } = this.props
        const { commons, squidJs, brizo, aquarius, faucet } = this.state

        const mimimalOutput = `${squidJs.software} ${squidJs.version}  \n${
            brizo.software
        } v${brizo.version} \n${aquarius.software} v${
            aquarius.version
        } \nKeeper Contracts ${brizo['keeper-version']} \n${faucet.software} v${
            faucet.version
        }`

        return minimal ? (
            <p className={styles.versionsMinimal}>
                <a title={mimimalOutput} href={'/about'}>
                    {commons.version} ({brizo.network})
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
