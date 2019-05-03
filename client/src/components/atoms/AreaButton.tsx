import React from 'react'
import styles from './AreaButton.module.scss'

const AreaButton = ({ title, description, action }: { title: string; description: string, action: any }) => {

    return (
        <div className={styles.areaButton}>
            <div onClick={action}>
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default AreaButton
