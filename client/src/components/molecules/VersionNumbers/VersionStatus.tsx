import React from 'react'
import styles from './VersionStatus.module.scss'

const statusInfo: { [key: string]: string } = {
    ok: 'Shows if connection to all component endpoints can be established.',
    network: 'Shows if all components are on the same network.',
    contracts: 'Shows if contracts loaded by components are the same version.'
}

const VersionStatus = ({
    status
}: {
    status: { ok: boolean; network: boolean; contracts: boolean }
}) => {
    return (
        <div className={styles.status}>
            {Object.entries(status).map(([key, value]) => (
                <div
                    className={styles.element}
                    key={key}
                    title={statusInfo[key]}
                >
                    <span
                        className={
                            value === true
                                ? styles.indicatorActive
                                : styles.indicator
                        }
                    >
                        {value}
                    </span>
                    <span className={styles.indicatorLabel}>
                        {key === 'ok' ? 'components' : key}
                    </span>
                </div>
            ))}
        </div>
    )
}

export default VersionStatus
