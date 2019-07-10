import React from 'react'
import useCollapse from 'react-collapsed'
import slugify from '@sindresorhus/slugify'
import styles from './VersionTableRow.module.scss'
import { VersionTableContracts, VersionTableCommons } from './VersionTable'
import VersionNumber from './VersionNumber'
import { ReactComponent as Caret } from '../../../img/caret.svg'

const VersionTableRow = ({ value }: { value: any }) => {
    const collapseStyles = {
        transitionDuration: '0.01s'
    }

    const expandStyles = {
        transitionDuration: '0.01s',
        transitionTimingFunction: 'ease-out'
    }

    const { getCollapseProps, getToggleProps, isOpen } = useCollapse({
        collapseStyles,
        expandStyles
    })

    return (
        <>
            <tr>
                <td>
                    {(value.name === 'Commons' || value.contracts) && (
                        <button className={styles.handle} {...getToggleProps()}>
                            <Caret className={isOpen ? styles.open : ''} />
                        </button>
                    )}
                    <a
                        href={`https://github.com/oceanprotocol/${slugify(
                            value.name || value.software
                        )}`}
                    >
                        <strong>{value.name || value.software}</strong>
                    </a>
                </td>
                <td>
                    <VersionNumber
                        name={value.name || value.software}
                        version={value.version}
                        status={value.status}
                        network={value.network}
                        commit={value.commit}
                    />
                </td>
            </tr>
            {value.name === 'Commons' && (
                <tr {...getCollapseProps()}>
                    <td colSpan={2}>
                        <VersionTableCommons />
                    </td>
                </tr>
            )}
            {value.contracts && (
                <tr {...getCollapseProps()}>
                    <td colSpan={2}>
                        <VersionTableContracts
                            contracts={value.contracts}
                            network={value.network || ''}
                            keeperVersion={value.keeperVersion}
                        />
                    </td>
                </tr>
            )}
        </>
    )
}

export default VersionTableRow
