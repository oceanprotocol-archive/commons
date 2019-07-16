import React from 'react'
import { render } from '@testing-library/react'
import { VersionTableContracts } from './VersionTable'

describe('VersionTableContracts', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <VersionTableContracts
                contracts={{ hello: 'hello', hello2: 'hello2' }}
                network="nile"
                keeperVersion="6.6.6"
            />
        )
        expect(container.firstChild).toBeInTheDocument()
    })

    it('renders correct Submarine links', () => {
        const { container, rerender } = render(
            <VersionTableContracts
                contracts={{ hello: 'hello', hello2: 'hello2' }}
                network="duero"
                keeperVersion="6.6.6"
            />
        )
        expect(container.querySelector('tr:last-child a').href).toMatch(
            /submarine.duero.dev-ocean/
        )

        rerender(
            <VersionTableContracts
                contracts={{ hello: 'hello', hello2: 'hello2' }}
                network="nile"
                keeperVersion="6.6.6"
            />
        )
        expect(container.querySelector('tr:last-child a').href).toMatch(
            /submarine.nile.dev-ocean/
        )

        rerender(
            <VersionTableContracts
                contracts={{ hello: 'hello', hello2: 'hello2' }}
                network="pacific"
                keeperVersion="6.6.6"
            />
        )
        expect(container.querySelector('tr:last-child a').href).toMatch(
            /submarine.oceanprotocol/
        )
    })
})
