import React from 'react'
import useCollapse from 'react-collapsed'
import { OceanPlatformTechStatus } from '@oceanprotocol/squid'
import slugify from '@sindresorhus/slugify'
import Spinner from '../../atoms/Spinner'
import styles from './VersionTableRow.module.scss'
import { VersionTableContracts } from './VersionTable'

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
        <span>
            {status === OceanPlatformTechStatus.Loading ? (
                <Spinner className={styles.spinner} small />
            ) : (
                status || 'Could not get version'
            )}
        </span>
    )

const VersionTableRow = ({ value }: { value: any }) => {
    const collapseStyles = {
        transition: '0.01s'
    }

    const expandStyles = {
        transition: '0.01s'
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

export default VersionTableRow
