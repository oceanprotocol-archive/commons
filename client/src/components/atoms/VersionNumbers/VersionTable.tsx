import React, { Fragment } from 'react'
import { VersionNumbersState as VersionTableProps } from '.'
import styles from './VersionTable.module.scss'
import slugify from '@sindresorhus/slugify'

const VersionTableContracts = ({
    contracts,
    network
}: {
    contracts: any
    network: string
}) => (
    <table>
        <tbody>
            {Object.keys(contracts).map(key => (
                <tr key={key}>
                    <td>
                        <span className={styles.label}>{key}</span>
                    </td>
                    <td>
                        <a
                            href={`https://submarine${network === 'duero' &&
                                '.duero'}.dev-ocean.com/address/${
                                contracts[key]
                            }`}
                        >
                            <code>{contracts[key]}</code>
                        </a>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
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
                                    href={`https://github.com/oceanprotocol/${slugify(
                                        value.software
                                    )}`}
                                >
                                    <strong>{value.software}</strong>
                                </a>
                            </td>
                            <td>
                                <code>{value.version}</code>
                            </td>
                        </tr>
                        {key === 'keeperContracts' && (
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
