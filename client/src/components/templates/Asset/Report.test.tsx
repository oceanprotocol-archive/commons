import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import ReactModal from 'react-modal'
import mockAxios from 'jest-mock-axios'
import Report from './Report'

afterEach(() => {
    mockAxios.reset()
})

const mockResponse = {
    data: { status: 'success' }
}

describe('Report', () => {
    it('renders without crashing', async () => {
        ReactModal.setAppElement(document.createElement('div'))

        const { getByText, getByLabelText, getByTestId } = render(
            <Report did="did:xxx" title="Hello" />
        )
        // Renders button by default
        expect(getByText('Report Data Set')).toBeInTheDocument()

        // open modal
        fireEvent.click(getByText('Report Data Set'))
        await wait(() => expect(getByText('did:xxx')).toBeInTheDocument())

        // add comment
        const comment = getByLabelText('Comment')
        fireEvent.change(comment, {
            target: { value: 'Plants' }
        })
        expect(comment).toHaveTextContent('Plants')
        fireEvent.click(getByTestId('report'))
        mockAxios.mockResponse(mockResponse)
        expect(mockAxios).toHaveBeenCalled()

        // close modal
        fireEvent.click(getByTestId('closeModal'))
    })

    it('catches response error', async () => {
        ReactModal.setAppElement(document.createElement('div'))

        const { getByText, getByLabelText, getByTestId } = render(
            <Report did="did:xxx" title="Hello" />
        )
        // open modal
        fireEvent.click(getByText('Report Data Set'))
        await wait(() => expect(getByText('did:xxx')).toBeInTheDocument())

        // add comment
        const comment = getByLabelText('Comment')
        fireEvent.change(comment, {
            target: { value: 'Plants' }
        })
        expect(comment).toHaveTextContent('Plants')
        fireEvent.click(getByTestId('report'))
        mockAxios.mockError({ message: 'Error catch' })

        // close modal
        fireEvent.click(getByTestId('closeModal'))
    })
})
