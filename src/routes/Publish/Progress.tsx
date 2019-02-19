import React from 'react'

const Progress = ({
    currentStep,
    totalSteps,
    steps
}: {
    currentStep: number
    totalSteps: number
    steps: any[]
}) => {
    return (
        <aside>
            <ul>
                {steps.map(({ title }, index) => (
                    <li key={index}>
                        {index + 1}
                        {title}
                    </li>
                ))}
            </ul>
        </aside>
    )
}

export default Progress
