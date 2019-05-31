import React from 'react'
import { render } from '@testing-library/react'
import { toDataUrl } from 'ethereum-blockies'
import Account from './Account'

describe('Account', () => {
    it('renders without crashing', () => {
        const { container } = render(<Account account={'0xxxxxxxxxxxxxxx'} />)
        expect(container.firstChild).toBeInTheDocument()
    })

    it('outputs empty state without account', () => {
        const { container } = render(<Account account={''} />)
        expect(container.firstChild).toHaveTextContent('No account selected')
    })

    it('outputs blockie img', () => {
        const account = '0xxxxxxxxxxxxxxx'
        const blockies = toDataUrl(account)

        const { container } = render(<Account account={account} />)
        expect(container.querySelector('.blockies')).toBeInTheDocument()
        expect(container.querySelector('.blockies')).toHaveAttribute(
            'src',
            blockies
        )
    })
})
