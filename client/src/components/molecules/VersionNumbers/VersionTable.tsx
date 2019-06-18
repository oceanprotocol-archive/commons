import React, { Fragment, useState } from 'react'
import { OceanPlatformTechStatus } from '@oceanprotocol/squid'
import slugify from '@sindresorhus/slugify'
import useCollapse from 'react-collapsed'
import { VersionNumbersState } from '.'
import styles from './VersionTable.module.scss'

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

const VersionRow = ({ value }: { value: any }) => {
    const collapseStyles = {
        transitionDuration: '0.1s'
    }

    const expandStyles = {
        transitionDuration: '0.1s'
    }

    const { getCollapseProps, getToggleProps, isOpen } = useCollapse({
        collapseStyles,
        expandStyles
    })

    return (
        <>
            <tr>
                <td>
                    {value.contracts && (
                        <button className={styles.handle} {...getToggleProps()}>
                            {isOpen ? (
                                <span>&#9660;</span>
                            ) : (
                                <span>&#9658;</span>
                            )}
                        </button>
                    )}
                    <a
                        href={`https://github.com/oceanprotocol/${slugify(
                            value.name || value.software
                        )}`}
                    >
                        <strong>{value.name}</strong>
                    </a>
                </td>
                <td>
                    <VersionNumber
                        name={value.name || value.software}
                        version={value.version}
                        status={value.status}
                        network={value.network}
                    />
                </td>
            </tr>
            {value.contracts && (
                <tr {...getCollapseProps()}>
                    <td colSpan={2}>
                        <VersionTableContracts
                            contracts={value.contracts}
                            network={value.network || ''}
                        />
                    </td>
                </tr>
            )}
        </>
    )
}

const VersionTable = ({ data }: { data: VersionNumbersState }) => {
    return (
        <div className={styles.tableWrap}>
            <table className={styles.table}>
                <tbody>
                    {Object.entries(data)
                        .filter(([key, value]) => key !== 'status')
                        .map(([key, value]) => (
                            <VersionRow key={key} value={value} />
                        ))}
                </tbody>
            </table>
        </div>
    )
}

export default VersionTable
