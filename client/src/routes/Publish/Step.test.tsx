import React from 'react'
import { render } from '@testing-library/react'
import Step from './Step'

const stateMock = {
    validationStatus: {
        1: { allFieldsValid: true },
        2: { allFieldsValid: true },
        3: { allFieldsValid: true }
    }
}

const propsMock = {
    inputChange: () => null,
    state: stateMock,
    title: 'Hello',
    description: 'description',
    next: () => null,
    prev: () => null,
    tryAgain: () => null,
    toStart: () => null
}

describe('Step', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <Step currentStep={1} index={0} totalSteps={3} {...propsMock} />
        )
        expect(container.firstChild).toBeInTheDocument()
    })

    it('renders previous button one page bigger than 1', () => {
        const { queryByText } = render(
            <Step currentStep={2} index={1} totalSteps={3} {...propsMock} />
        )
        expect(queryByText('← Previous')).toBeInTheDocument()
    })

    it('does not render next button when on last step', () => {
        const { queryByText } = render(
            <Step currentStep={3} index={2} totalSteps={3} {...propsMock} />
        )
        expect(queryByText('Next →')).toBeNull()
    })
})
