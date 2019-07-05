import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import Button from './Button'

describe('Button', () => {
    it('default renders correctly without crashing', () => {
        const { getByTestId } = render(
            <Button data-testid="button-default">I am a default button</Button>
        )
        expect(getByTestId('button-default')).toHaveTextContent('default')
    })

    it('primary renders correctly without crashing', () => {
        const { getByTestId } = render(
            <Button data-testid="button-primary" primary>
                I am a primary button
            </Button>
        )
        expect(getByTestId('button-primary')).toHaveTextContent('primary')
        expect(getByTestId('button-primary').className).toMatch(/buttonPrimary/)
    })

    it('Link renders correctly without crashing', () => {
        const { getByTestId } = render(
            <Router>
                <Button data-testid="button-to" to="https://hello.com">
                    I am a Link button
                </Button>
            </Router>
        )
        expect(getByTestId('button-to')).toHaveTextContent('Link')
    })

    it('href renders correctly without crashing', () => {
        const { getByTestId } = render(
            <Button data-testid="button-href" href="https://hello.com">
                I am a href button
            </Button>
        )
        expect(getByTestId('button-href')).toHaveTextContent('href')
        expect(getByTestId('button-href').nodeName).toBe('A')
    })

    it('link renders correctly without crashing', () => {
        const { getByTestId } = render(
            <Button data-testid="button-link" link>
                I am a link button
            </Button>
        )
        expect(getByTestId('button-link')).toHaveTextContent('link')
        expect(getByTestId('button-link').className).toMatch(/link/)
    })
})
