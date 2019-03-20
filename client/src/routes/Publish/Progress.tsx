import React from 'react'
import styles from './Progress.module.scss'

const Progress = ({
    currentStep,
    steps
}: {
    currentStep: number
    steps: any[]
}) => {
    return (
        <ul className={styles.progress}>
            {steps.map(({ title }, index) => (
                <li
                    key={index}
                    className={
                        currentStep === index + 1
                            ? styles.active
                            : currentStep > index + 1
                            ? styles.completed
                            : styles.item
                    }
                >
                    <span className={styles.number}>{index + 1}</span>
                    <span className={styles.label}>{title}</span>
                </li>
            ))}
        </ul>
    )
}

export default Progress
