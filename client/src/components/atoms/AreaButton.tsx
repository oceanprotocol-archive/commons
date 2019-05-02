import React from 'react'
import styles from './AreaButton.module.scss'

const AreaButton = ({ title, description, action }: { title: string; description: string, action: any }) => {

    return (
        <article className={styles.areaButton}>
            <a href="#" onClick={action}>
                <h1>{title}</h1>
                <p>{description}</p>
            </a>
        </article>
    )
}

export default AreaButton
