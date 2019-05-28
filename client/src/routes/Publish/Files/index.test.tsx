import React from 'react'
import { render, fireEvent, waitForElement } from 'react-testing-library'
import Files from '.'

const onChange = jest.fn()

const files = [
    {
        found: true,
        url: 'https://hello.com',
        checksum: 'cccccc',
        checksumType: 'MD5',
        contentLength: 100,
        contentType: 'application/zip',
        resourceId: 'xxx',
        encoding: 'UTF-8',
        compression: 'zip'
    }
]

const setup = () => {
    const utils = render(
        <Files
            files={files}
            placeholder={'Hello'}
            name={'Hello'}
            onChange={onChange}
        />
    )
    const { container } = utils
    return { container, ...utils }
}

describe('Files', () => {
    it('renders without crashing', () => {
        const { container } = setup()

        expect(container.firstChild).toBeInTheDocument()
        expect(container.querySelector('.itemForm')).not.toBeInTheDocument()
    })

    it('new file form can be opened and closed', async () => {
        const { container, getByText } = setup()

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
        const { getByTitle } = setup()

        fireEvent.click(getByTitle('Remove item'))
        expect(files.length).toBe(0)
    })

    it('item can be added', async () => {
        const { getByText, getByPlaceholderText } = setup()

        fireEvent.click(getByText('+ Add a file'))
        await waitForElement(() => getByText('- Cancel'))
        fireEvent.change(getByPlaceholderText('Hello'), {
            target: { value: 'https://hello.com' }
        })
        fireEvent.click(getByText('Add File'))
    })
})
