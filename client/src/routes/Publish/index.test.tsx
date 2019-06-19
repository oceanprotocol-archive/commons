import React from 'react'
import { MemoryRouter } from 'react-router'
import { render, fireEvent } from '@testing-library/react'
import Publish from '.'
import { User } from '../../context'
import { userMockConnected } from '../../../__mocks__/user-mock'

describe('Publish', () => {
    it('renders without crashing', () => {
        const { container, getByText } = render(
            <User.Provider value={userMockConnected}>
                <MemoryRouter>
                    <Publish />
                </MemoryRouter>
            </User.Provider>
        )
        expect(container.firstChild).toBeInTheDocument()
        expect(getByText('Next →')).toHaveAttribute('disabled')
    })

    it('next button works', () => {
        const { getByText, getByLabelText, getByTestId } = render(
            <User.Provider value={userMockConnected}>
                <MemoryRouter>
                    <Publish />
                </MemoryRouter>
            </User.Provider>
        )

        // Title
        const inputName = getByLabelText('Title')
        fireEvent.change(inputName, {
            target: { value: 'Hello' }
        })

        // Files
        const inputFiles = getByTestId('files')
        fireEvent.change(inputFiles, {
            target: {
                value: JSON.stringify([
                    { url: 'https://demo.com', contentType: '', found: false }
                ])
            }
        })

        // expect(getByText('Next →')).not.toHaveAttribute('disabled')
        fireEvent.click(getByText('Next →'))
    })
})
