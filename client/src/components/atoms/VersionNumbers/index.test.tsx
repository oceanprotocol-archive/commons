import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import mockAxios from 'jest-mock-axios'
import VersionNumbers from '.'

afterEach(() => {
    mockAxios.reset()
})

const mockResponse = {
    data: {
        software: 'Brizo',
        version: '6.6.6',
        contracts: { Hello: 'Hello', Another: 'Hello' },
        network: 'hello'
    }
}

describe('VersionNumbers', () => {
    it('renders without crashing', () => {
        const { container } = render(<VersionNumbers />)
        mockAxios.mockResponse(mockResponse)
        expect(mockAxios.get).toHaveBeenCalled()
        expect(container.firstChild).toBeInTheDocument()
    })

    it('minimal component versions in link title, prefixed with `v`', async () => {
        const { getByTitle } = render(<VersionNumbers minimal />)
        mockAxios.mockResponse(mockResponse)
        expect(mockAxios.get).toHaveBeenCalled()
        await waitForElement(() => getByTitle(/v6.6.6/))
    })
})
