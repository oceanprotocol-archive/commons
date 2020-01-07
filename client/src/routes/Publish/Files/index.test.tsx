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
        contentLength: '100',
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
            contentLength: '237347827',
            found: true
        }
    }
}

describe('Files', () => {
    const ui = (
        <Files
            files={files}
            placeholder="Hello"
            name="Hello"
            onChange={onChange}
        />
    )

    it('renders without crashing', () => {
        const { container } = render(ui)
        expect(container.firstChild).toBeInTheDocument()
        expect(container.querySelector('.itemForm')).not.toBeInTheDocument()
    })

    it('new file form can be opened and closed', async () => {
        const { container, getByText } = render(ui)

        // open
        fireEvent.click(getByText('+ From URL'))
        await waitForElement(() => getByText('- Cancel'))
        expect(container.querySelector('.itemForm')).toBeInTheDocument()

        // close
        fireEvent.click(getByText('- Cancel'))
        await waitForElement(() => getByText('+ From URL'))
        expect(container.querySelector('.itemForm')).not.toBeInTheDocument()
    })

    it('new IPFS file form can be opened and closed', async () => {
        const { getByText } = render(ui)

        // open
        fireEvent.click(getByText('+ Add to IPFS'))
        const text = await waitForElement(() =>
            getByText(/Connected to / || /IPFS connection error/)
        )
        expect(text).toBeInTheDocument()

        // close
        fireEvent.click(getByText('- Cancel'))
        await waitForElement(() => getByText('+ Add to IPFS'))
        expect(text).not.toBeInTheDocument()
    })

    it('item can be removed', () => {
        const { getAllByTitle } = render(ui)
        fireEvent.click(getAllByTitle('Remove item')[0])
        expect(files.length).toBe(0)
    })

    it('item can be added', async () => {
        const { getAllByText, getByText, getByPlaceholderText } = render(ui)

        fireEvent.click(getAllByText('+ From URL')[0])
        await waitForElement(() => getByText('- Cancel'))
        fireEvent.change(getByPlaceholderText('Hello'), {
            target: { value: 'https://hello.com' }
        })
        fireEvent.click(getByText('Add File'))

        mockAxios.mockResponse(mockResponse)
        expect(mockAxios.get).toHaveBeenCalled()
    })
})
