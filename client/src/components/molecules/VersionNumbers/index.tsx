import React, { PureComponent } from 'react'
import { Logger } from '@oceanprotocol/squid'
import axios from 'axios'
import { version } from '../../../../package.json'
import { version as versionSquid } from '@oceanprotocol/squid/package.json'
import styles from './index.module.scss'

import { aquariusUri, brizoUri, faucetUri } from '../../../config'

import VersionTable from './VersionTable'
import { isJsonString } from './utils'

export const commonsVersion =
    process.env.NODE_ENV === 'production' ? version : `${version}-dev`

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
        isLoading: boolean
        software: string
        version: string
    }
    brizo: {
        isLoading: boolean
        software: string
        version: string
        network: string
        'keeper-version': string
        'keeper-url': string
        contracts: any
    }
    keeperContracts: {
        isLoading: boolean
        software: string
        version: string
        network: string
        contracts: any
    }
    faucet: {
        isLoading: boolean
        software?: string
        version?: string
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
            version: versionSquid
        },
        aquarius: {
            isLoading: true,
            software: 'Aquarius',
            version: ''
        },
        brizo: {
            isLoading: true,
            software: 'Brizo',
            version: '',
            contracts: {} as any,
            network: '',
            'keeper-version': '0.0.0',
            'keeper-url': ''
        },
        keeperContracts: {
            isLoading: true,
            software: 'Keeper Contracts',
            version: '',
            contracts: {} as any,
            network: ''
        },
        faucet: {
            isLoading: true,
            software: 'Faucet',
            version: ''
        }
    }

    // for canceling axios requests
    public signal = axios.CancelToken.source()

    public componentWillMount() {
        this.setAquarius()
        this.setBrizoAndKeeper()
        this.setFaucet()
    }

    public componentWillUnmount() {
        this.signal.cancel()
    }

    private async setAquarius() {
        const aquarius = await this.getData(aquariusUri)
        aquarius &&
            aquarius.version !== undefined &&
            this.setState({ aquarius: { isLoading: false, ...aquarius } })
    }

    private async setBrizoAndKeeper() {
        const brizo = await this.getData(brizoUri)

        const keeperVersion =
            brizo['keeper-version'] && brizo['keeper-version'].replace('v', '')
        const keeperNetwork =
            brizo['keeper-url'] &&
            new URL(brizo['keeper-url']).hostname.split('.')[0]

        brizo &&
            brizo.version !== undefined &&
            this.setState({
                brizo: {
                    isLoading: false,
                    ...brizo
                },
                keeperContracts: {
                    ...this.state.keeperContracts,
                    isLoading: false,
                    version: keeperVersion,
                    contracts: brizo.contracts,
                    network: keeperNetwork
                }
            })
    }

    private async setFaucet() {
        const faucet = await this.getData(faucetUri)

        // backwards compatibility
        isJsonString(faucet) === false &&
            this.setState({
                faucet: { ...this.state.faucet, isLoading: false }
            })

        // the new thing
        faucet &&
            faucet.version !== undefined &&
            this.setState({ faucet: { isLoading: false, ...faucet } })
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
        const { commons, squidJs, brizo, aquarius, faucet } = this.state

        const mimimalOutput = `${squidJs.software} v${squidJs.version}  \n${
            brizo.software
        } v${brizo.version} \n${aquarius.software} v${
            aquarius.version
        } \nKeeper Contracts ${brizo['keeper-version']} \n${faucet.software} v${
            faucet.version
        }`

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
