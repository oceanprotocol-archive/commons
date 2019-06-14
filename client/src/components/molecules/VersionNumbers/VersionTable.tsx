import React, { Fragment } from 'react'
import { VersionNumbersState as VersionTableProps } from '.'
import styles from './VersionTable.module.scss'
import slugify from '@sindresorhus/slugify'
import Spinner from '../../atoms/Spinner'

const VersionTableContracts = ({
    contracts,
    network
}: {
    contracts: any
    network: string
}) => (
    <table>
        <tbody>
            {contracts &&
                Object.keys(contracts).map(key => {
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
    isLoading,
    software,
    version,
    network
}: {
    isLoading: boolean
    software: string
    version: string
    network: string
}) =>
    isLoading ? (
        <Spinner small className={styles.spinner} />
    ) : version ? (
        <>
            <a
                href={`https://github.com/oceanprotocol/${slugify(
                    software
                )}/releases/tag/v${version}`}
            >
                <code>v{version}</code>
            </a>
            {network && `(${network})`}
        </>
    ) : (
        <span>Could not get version</span>
    )

const VersionTable = ({ data }: { data: VersionTableProps }) => (
    <div className={styles.tableWrap}>
        <table className={styles.table}>
            <tbody>
                {Object.entries(data).map(([key, value]) => (
                    <Fragment key={key}>
                        <tr key={key}>
                            <td>
                                <a
                                    href={
                                        value.software &&
                                        `https://github.com/oceanprotocol/${slugify(
                                            value.software
                                        )}`
                                    }
                                >
                                    <strong>{value.software}</strong>
                                </a>
                            </td>
                            <td>
                                <VersionNumber
                                    isLoading={value.isLoading}
                                    software={value.software}
                                    version={value.version}
                                    network={value.network}
                                />
                            </td>
                        </tr>
                        {key === 'keeperContracts' && data.brizo.contracts && (
                            <tr>
                                <td colSpan={2}>
                                    <VersionTableContracts
                                        contracts={data.brizo.contracts}
                                        network={data.brizo.network}
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
