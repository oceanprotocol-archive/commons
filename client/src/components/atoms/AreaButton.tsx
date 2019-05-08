import React from 'react'
import styles from './AreaButton.module.scss'

const AreaButton = ({ title, description, action, image }: { title: string; description: string, action: any, image: any }) => {
    return (
        <div className={styles.areaButton} onClick={action}>
            <div>
                <img src={image} alt=""/>
                <div className="text">
                    <h1>{title}</h1>
                    <>{description}</>
                </div>
            </div>
        </div>
    )
}

export default AreaButton
