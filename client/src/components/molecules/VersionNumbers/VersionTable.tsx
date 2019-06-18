import React from 'react'
import { VersionNumbersState } from '.'
import VersionTableRow from './VersionTableRow'
import styles from './VersionTable.module.scss'

export const VersionTableContracts = ({
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

const VersionTable = ({ data }: { data: VersionNumbersState }) => {
    return (
        <div className={styles.tableWrap}>
            <table className={styles.table}>
                <tbody>
                    {Object.entries(data)
                        .filter(([key]) => key !== 'status')
                        .map(([key, value]) => (
                            <VersionTableRow key={key} value={value} />
                        ))}
                </tbody>
            </table>
        </div>
    )
}

export default VersionTable
