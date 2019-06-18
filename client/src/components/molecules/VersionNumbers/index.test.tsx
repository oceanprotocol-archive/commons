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
    commons: {
        name: 'Commons',
        version: commonsVersion
    },
    squid: {
        name: 'Squid-js',
        status: 'Loading'
    },
    aquarius: {
        name: 'Aquarius',
        status: 'Loading'
    },
    brizo: {
        name: 'Brizo',
        network: 'Nile',
        status: 'Loading'
    },
    faucet: {
        name: 'Faucet',
        version: '',
        status: 'Loading'
    },
    status: {
        ok: false,
        network: false,
        contracts: false
    }
}

const stateMockIncomplete = {
    commons: {
        name: 'Commons',
        version: commonsVersion
    },
    squid: {
        name: 'Squid-js',
        version: undefined
    },
    aquarius: {
        name: 'Aquarius',
        version: undefined
    },
    brizo: {
        name: 'Brizo',
        version: undefined,
        contracts: undefined,
        network: undefined,
        keeperVersion: undefined,
        keeperUrl: undefined
    },
    faucet: {
        name: 'Faucet',
        version: undefined
    },
    status: {
        ok: false,
        network: false,
        contracts: false
    }
}

const mockResponse = {
    data: {
        software: 'Faucet',
        version: '6.6.6'
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
})
