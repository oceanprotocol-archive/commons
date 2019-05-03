import React from 'react'
import styles from './AreaButton.module.scss'

const AreaButton = ({ title, description, action }: { title: string; description: string, action: any }) => {

    return (
        <div className={styles.areaButton} onClick={action}>
            <div>
                <img src="https://placeimg.com/150/150/any" alt="{title}"/>
                <div className="text">
                    <h1>{title}</h1>
                    <>{description}</>
                </div>
            </div>
        </div>
    )
}

export default AreaButton
