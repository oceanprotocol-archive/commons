import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import StepRegisterContent, { messages } from './StepRegisterContent'

const stateMock = {
    publishedDid: '',
    publishingError: '',
    publishingStep: 0,
    isPublishing: false,
    isPublished: false
}

const propsMock = {
    tryAgain: jest.fn(),
    toStart: jest.fn(),
    content: 'Hello'
}

describe('StepRegisterContent', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <Router>
                <StepRegisterContent state={stateMock} {...propsMock} />
            </Router>
        )
        expect(container.firstChild).toBeInTheDocument()
    })

    it('renders publishing state', () => {
        const { container } = render(
            <Router>
                <StepRegisterContent
                    state={{ ...stateMock, isPublishing: true }}
                    {...propsMock}
                />
            </Router>
        )
        expect(container.querySelector('.spinnerMessage')).toHaveTextContent(
            messages[stateMock.publishingStep].replace(/<(?:.|\n)*?>/gm, '')
        )
    })

    it('renders published state', () => {
        const { container, getByText } = render(
            <Router>
                <StepRegisterContent
                    state={{ ...stateMock, isPublished: true }}
                    {...propsMock}
                />
            </Router>
        )
        expect(container.querySelector('.success')).toHaveTextContent(
            'Your asset is published!'
        )

        fireEvent.click(getByText('Publish another asset'))
        expect(propsMock.toStart).toHaveBeenCalled()
    })

    it('renders error state', () => {
        const { container, getByText } = render(
            <Router>
                <StepRegisterContent
                    state={{ ...stateMock, publishingError: 'Error!' }}
                    {...propsMock}
                />
            </Router>
        )
        expect(
            container.querySelector('.message:last-child')
        ).toHaveTextContent('Something went wrong')

        fireEvent.click(getByText('try again'))
        expect(propsMock.tryAgain).toHaveBeenCalled()
    })
})
