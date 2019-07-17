import React from 'react'
import { OceanPlatformTechStatus } from '@oceanprotocol/squid'
import slugify from '@sindresorhus/slugify'
import Spinner from '../../atoms/Spinner'
import styles from './VersionNumber.module.scss'

const VersionNumber = ({
    name,
    version,
    network,
    status,
    commit
}: {
    name: string
    version?: string
    network?: string
    status?: OceanPlatformTechStatus
    commit?: string
}) =>
    version ? (
        <>
            <a
                href={`https://github.com/oceanprotocol/${slugify(
                    name
                )}/releases/tag/v${version}`}
                title="Go to release on GitHub"
            >
                <code>v{version}</code>
            </a>
            {commit && (
                <a
                    href={`https://github.com/oceanprotocol/${slugify(
                        name
                    )}/commit/${commit}`}
                    className={styles.commit}
                    title={`Go to commit ${commit} on GitHub`}
                >
                    <code>{commit.substring(0, 7)}</code>
                </a>
            )}
            {network && <span className={styles.network}>{` ${network}`}</span>}
        </>
    ) : (
        <span>
            {status === OceanPlatformTechStatus.Loading ? (
                <Spinner className={styles.spinner} small />
            ) : (
                status || 'Could not get version'
            )}
        </span>
    )

export default VersionNumber
