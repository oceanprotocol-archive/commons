import React from 'react'
import { render, fireEvent, waitForElement } from '@testing-library/react'
import mockAxios from 'jest-mock-axios'
import Files from '.'

const onChange = jest.fn()

afterEach(() => {
    mockAxios.reset()
})

const files = [
    {
        url: 'https://hello.com',
        checksum: 'cccccc',
        checksumType: 'MD5',
        contentLength: 100,
        contentType: 'application/zip',
        resourceId: 'xxx',
        encoding: 'UTF-8',
        compression: 'zip',
        found: true
    }
]

const mockResponse = {
    data: {
        result: {
            url: 'https://demo.com',
            contentType: 'application/zip',
            contentLength: 237347827,
            found: true
        }
    }
}

const renderComponent = () =>
    render(
        <Files
            files={files}
            placeholder="Hello"
            name="Hello"
            onChange={onChange}
        />
    )

describe('Files', () => {
    it('renders without crashing', async () => {
        const { container } = renderComponent()

        expect(container.firstChild).toBeInTheDocument()
        expect(container.querySelector('.itemForm')).not.toBeInTheDocument()
    })

    it('new file form can be opened and closed', async () => {
        const { container, getByText } = renderComponent()

        // open
        fireEvent.click(getByText('+ Add a file'))
        await waitForElement(() => getByText('- Cancel'))
        expect(container.querySelector('.itemForm')).toBeInTheDocument()

        // close
        fireEvent.click(getByText('- Cancel'))
        await waitForElement(() => getByText('+ Add a file'))
        expect(container.querySelector('.grow-exit')).toBeInTheDocument()
    })

    it('item can be removed', async () => {
        const { getByTitle } = renderComponent()

        fireEvent.click(getByTitle('Remove item'))
        expect(files.length).toBe(0)
    })

    it('item can be added', async () => {
        const { getByText, getByPlaceholderText } = renderComponent()

        fireEvent.click(getByText('+ Add a file'))
        await waitForElement(() => getByText('- Cancel'))
        fireEvent.change(getByPlaceholderText('Hello'), {
            target: { value: 'https://hello.com' }
        })
        fireEvent.click(getByText('Add File'))
        mockAxios.mockResponse(mockResponse)
        expect(mockAxios).toHaveBeenCalled()
    })
})
