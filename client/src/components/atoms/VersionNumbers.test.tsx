import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import mockAxios from 'jest-mock-axios'
import VersionNumbers from './VersionNumbers'

afterEach(() => {
    mockAxios.reset()
})

describe('VersionNumbers', () => {
    it('renders without crashing', () => {
        const { container } = render(<VersionNumbers />)
        expect(container.firstChild).toBeInTheDocument()
    })

    it('returns component versions in link title, prefixed with `v`', async () => {
        const { getByTitle } = render(<VersionNumbers />)
        mockAxios.mockResponse({ data: { version: '6.6.6' } })
        expect(mockAxios.get).toHaveBeenCalled()
        await waitForElement(() => getByTitle(/v6.6.6/))
    })
})
