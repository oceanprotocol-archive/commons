import React, { Fragment } from 'react'
import { OceanPlatformTechStatus } from '@oceanprotocol/squid'
import { VersionNumbersState } from '.'
import styles from './VersionTable.module.scss'
import slugify from '@sindresorhus/slugify'

const VersionTableContracts = ({
    contracts,
    network
}: {
    contracts: {
        [contractName: string]: string
    }
    network: string
}) => (
    <table>
        <tbody>
            {contracts &&
                Object.keys(contracts)
                    // sort alphabetically
                    .sort((a, b) => a.localeCompare(b))
                    .map(key => {
                        const submarineLink = `https://submarine${
                            network === 'duero'
                                ? '.duero'
                                : network === 'pacific'
                                ? '.pacific'
                                : ''
                        }.dev-ocean.com/address/${contracts[key]}`

                        return (
                            <tr key={key}>
                                <td>
                                    <span className={styles.label}>{key}</span>
                                </td>
                                <td>
                                    <a href={submarineLink}>
                                        <code>{contracts[key]}</code>
                                    </a>
                                </td>
                            </tr>
                        )
                    })}
        </tbody>
    </table>
)

const VersionNumber = ({
    name,
    version,
    network,
    status
}: {
    name: string
    version?: string
    network?: string
    status: OceanPlatformTechStatus
}) =>
    version ? (
        <>
            <a
                href={`https://github.com/oceanprotocol/${slugify(
                    name
                )}/releases/tag/v${version}`}
            >
                <code>v{version}</code>
            </a>
            {network && `(${network})`}
        </>
    ) : (
        <span>{status || 'Could not get version'}</span>
    )

const VersionTable = ({ data }: { data: VersionNumbersState }) => (
    <div className={styles.tableWrap}>
        <table className={styles.table}>
            <tbody>
                {Object.entries(data)
                    .filter(([key, value]) => key !== 'status')
                    .map(([key, value]) => (
                        <Fragment key={key}>
                            <tr>
                                <td>
                                    <a
                                        href={
                                            value.name &&
                                            `https://github.com/oceanprotocol/${slugify(
                                                value.name
                                            )}`
                                        }
                                    >
                                        <strong>{value.name}</strong>
                                    </a>
                                </td>
                                <td>
                                    <VersionNumber
                                        name={value.name}
                                        version={value.version}
                                        status={value.status}
                                        network={value.network}
                                    />
                                </td>
                            </tr>
                            {value.contracts && (
                                <tr>
                                    <td colSpan={2}>
                                        <VersionTableContracts
                                            contracts={value.contracts}
                                            network={value.network || ''}
                                        />
                                    </td>
                                </tr>
                            )}
                        </Fragment>
                    ))}
            </tbody>
        </table>
    </div>
)

export default VersionTable
