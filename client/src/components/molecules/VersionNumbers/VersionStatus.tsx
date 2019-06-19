import React from 'react'
import styles from './VersionStatus.module.scss'

const VersionStatus = ({
    status
}: {
    status: { ok: boolean; contracts: boolean; network: boolean }
}) => {
    return (
        <div className={styles.status}>
            {Object.entries(status).map(([key, value]) => (
                <div className={styles.element} key={key}>
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
