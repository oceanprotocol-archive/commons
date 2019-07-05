import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import AccountStatus from '.'

describe('AccountStatus', () => {
    it('renders without crashing', () => {
        const { container } = render(<AccountStatus />)
        expect(container.firstChild).toBeInTheDocument()
    })

    it('togglePopover fires', () => {
        const { container } = render(<AccountStatus />)

        const indicator = container.querySelector('.statusIndicator')

        indicator && fireEvent.mouseOver(indicator)
        expect(container.querySelector('.popover')).toBeInTheDocument()
        indicator && fireEvent.mouseOut(indicator)
    })
})
