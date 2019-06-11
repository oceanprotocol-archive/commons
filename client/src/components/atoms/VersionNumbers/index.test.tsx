import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import mockAxios from 'jest-mock-axios'
import { StateMock } from '@react-mock/state'
import { version as versionSquid } from '@oceanprotocol/squid/package.json'
import VersionNumbers, { commonsVersion } from '.'

afterEach(() => {
    mockAxios.reset()
})

const stateMock = {
    commons: { software: 'Commons', version: commonsVersion },
    squidJs: {
        software: 'Squid-js',
        version: versionSquid
    },
    aquarius: {
        isLoading: false,
        software: 'Aquarius',
        version: ''
    },
    brizo: {
        isLoading: false,
        software: 'Brizo',
        version: '',
        contracts: {},
        network: '',
        'keeper-version': '0.0.0',
        'keeper-url': ''
    },
    keeperContracts: {
        isLoading: false,
        software: 'Keeper Contracts',
        version: '',
        contracts: {},
        network: ''
    },
    faucet: {
        isLoading: false,
        software: 'Faucet',
        version: ''
    }
}

const stateMockIncomplete = {
    commons: { software: 'Commons', version: commonsVersion },
    squidJs: {
        software: 'Squid-js',
        version: versionSquid
    },
    aquarius: {
        isLoading: false,
        software: 'Aquarius',
        version: undefined
    },
    brizo: {
        isLoading: false,
        software: 'Brizo',
        version: undefined,
        contracts: undefined,
        network: undefined,
        'keeper-version': undefined,
        'keeper-url': undefined
    },
    keeperContracts: {
        isLoading: false,
        software: 'Keeper Contracts',
        version: undefined,
        contracts: undefined,
        network: undefined
    },
    faucet: {
        isLoading: false,
        software: 'Faucet',
        version: undefined
    }
}

const mockResponse = {
    data: {
        software: 'Brizo',
        version: '6.6.6',
        contracts: { Hello: 'Hello', Another: 'Hello' },
        network: 'hello',
        'keeper-url': 'https://squid.com',
        'keeper-version': '6.6.6'
    }
}

const mockResponseFaulty = {
    status: 404,
    statusText: 'Not Found',
    data: {}
}

describe('VersionNumbers', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <StateMock state={stateMock}>
                <VersionNumbers />
            </StateMock>
        )
        mockAxios.mockResponse(mockResponse)
        expect(mockAxios.get).toHaveBeenCalled()
        expect(container.firstChild).toBeInTheDocument()
    })

    it('renders without proper component response', () => {
        const { container } = render(
            <StateMock state={stateMockIncomplete}>
                <VersionNumbers />
            </StateMock>
        )
        mockAxios.mockResponse(mockResponseFaulty)
        expect(mockAxios.get).toHaveBeenCalled()
        expect(container.querySelector('table')).toHaveTextContent(
            'Could not get version'
        )
    })

    it('minimal component versions in link title, prefixed with `v`', async () => {
        const { getByTitle } = render(<VersionNumbers minimal />)
        mockAxios.mockResponse(mockResponse)
        expect(mockAxios.get).toHaveBeenCalled()
        await waitForElement(() => getByTitle(/v6.6.6/))
    })
})
