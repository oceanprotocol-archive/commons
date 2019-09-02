import React from 'react'
import { VersionNumbersState } from '.'
import VersionTableRow from './VersionTableRow'
import styles from './VersionTable.module.scss'
import VersionNumber from './VersionNumber'

import {
    serviceUri,
    nodeUri,
    aquariusUri,
    brizoUri,
    brizoAddress,
    secretStoreUri,
    faucetUri
} from '../../../config'

const commonsConfig = {
    serviceUri,
    nodeUri,
    aquariusUri,
    brizoUri,
    brizoAddress,
    secretStoreUri,
    faucetUri
}

export const VersionTableContracts = ({
    contracts,
    network,
    keeperVersion
}: {
    contracts: {
        [contractName: string]: string
    }
    network: string
    keeperVersion?: string
}) => (
    <table>
        <tbody>
            <tr>
                <td>
                    <strong>Keeper Contracts</strong>
                </td>
                <td>
                    <VersionNumber
                        name="Keeper Contracts"
                        version={keeperVersion}
                    />
                </td>
            </tr>
            {contracts &&
                Object.keys(contracts)
                    // sort alphabetically
                    .sort((a, b) => a.localeCompare(b))
                    .map(key => {
                        const submarineLink = `https://submarine.${
                            network === 'pacific'
                                ? 'oceanprotocol'
                                : `${network}.dev-ocean`
                        }.com/address/${contracts[key]}`

                        return (
                            <tr key={key}>
                                <td>
                                    <code className={styles.label}>{key}</code>
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

export const VersionTableCommons = () => (
    <table>
        <tbody>
            {Object.entries(commonsConfig).map(([key, value]) => (
                <tr key={key}>
                    <td>
                        <code className={styles.label}>{key}</code>
                    </td>
                    <td>
                        <code>{value}</code>
                    </td>
                </tr>
            ))}
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
