import React, { PureComponent } from 'react'
import { version } from '../../../package.json'
import { version as versionSquid } from '@oceanprotocol/squid/package.json'
import styles from './VersionNumbers.module.scss'

import {
    aquariusHost,
    aquariusPort,
    aquariusScheme,
    brizoHost,
    brizoPort,
    brizoScheme
} from '../../config'
import { Logger } from '@oceanprotocol/squid'

const commonsVersion =
    process.env.NODE_ENV === 'production' ? `v${version}` : `v${version}-dev`

export default class VersionNumbers extends PureComponent {
    public state = {
        commons: commonsVersion,
        squidJs: `v${versionSquid}`,
        aquarius: 'v0.0.0',
        brizo: 'v0.0.0'
    }

    public async componentDidMount() {
        try {
            const {
                versionAquarius,
                versionBrizo
            } = await this.getComponentVersions()

            this.setState({
                aquarius: `v${versionAquarius}`,
                brizo: `v${versionBrizo}`
            })
        } catch (error) {
            Logger.error(error.message)
        }
    }

    private async getComponentVersions() {
        const responseAquarius = await fetch(
            `${aquariusScheme}://${aquariusHost}:${aquariusPort}`
        )
        const jsonAquarius = await responseAquarius.json()
        const versionAquarius = jsonAquarius.version

        const responseBrizo = await fetch(
            `${brizoScheme}://${brizoHost}:${brizoPort}`
        )
        const jsonBrizo = await responseBrizo.json()
        const versionBrizo = jsonBrizo.version

        return { versionAquarius, versionBrizo }
    }

    public render() {
        const { commons, squidJs, brizo, aquarius } = this.state

        return (
            <p className={styles.version}>
                <a
                    title={`Squid-js ${squidJs} - Brizo ${brizo} - Aquarius ${aquarius}`}
                    href={`https://github.com/oceanprotocol/commons/releases/tag/${commons}`}
                >
                    {commons}
                </a>
            </p>
        )
    }
}
