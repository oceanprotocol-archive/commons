import React, { PureComponent } from 'react'
import { Logger } from '@oceanprotocol/squid'
import axios from 'axios'
import { version } from '../../../package.json'
import { version as versionSquid } from '@oceanprotocol/squid/package.json'
import styles from './VersionNumbers.module.scss'

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
} from '../../config'

const commonsVersion =
    process.env.NODE_ENV === 'production' ? `v${version}` : `v${version}-dev`

interface VersionNumbersState {
    commons: string
    squidJs: string
    aquarius: string
    brizo: string
    faucet: string
}

export default class VersionNumbers extends PureComponent<
    {},
    VersionNumbersState
> {
    public state = {
        commons: commonsVersion,
        squidJs: `v${versionSquid}`,
        aquarius: 'v0.0.0',
        brizo: 'v0.0.0',
        faucet: 'v0.0.0'
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
            const versionAquarius = await this.getVersion(
                aquariusScheme,
                aquariusHost,
                aquariusPort
            )
            this.setState({ aquarius: `v${versionAquarius}` })

            const versionBrizo = await this.getVersion(
                brizoScheme,
                brizoHost,
                brizoPort
            )
            this.setState({ brizo: `v${versionBrizo}` })

            const versionFaucet = await this.getVersion(
                faucetScheme,
                faucetHost,
                faucetPort
            )
            this.setState({ faucet: `v${versionFaucet}` })
        } catch (error) {
            !axios.isCancel(error) && Logger.error(error.message)
        }
    }

    private async getVersion(
        scheme: string,
        host: string,
        port: number | string
    ) {
        const { data } = await axios.get(`${scheme}://${host}:${port}`, {
            headers: { Accept: 'application/json' },
            cancelToken: this.signal.token
        })
        const { version } = data
        return version
    }

    public render() {
        const { commons, squidJs, brizo, aquarius, faucet } = this.state

        const componentsOutput = `Squid-js ${squidJs}  \nBrizo ${brizo} \nAquarius ${aquarius} \nFaucet ${faucet}`

        return (
            <p className={styles.version}>
                <a
                    title={componentsOutput}
                    href={`https://github.com/oceanprotocol/commons/releases/tag/${commons}`}
                >
                    {commons}
                </a>
            </p>
        )
    }
}
