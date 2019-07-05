import React from 'react'
import { render } from '@testing-library/react'
import Details from './index'

describe('Details', () => {
    it('renders loading state by default', () => {
        const { container } = render(
            <Details
                location={{
                    search: '',
                    pathname: '/',
                    state: '',
                    hash: ''
                }}
                match={{
                    params: {
                        did: ''
                    }
                }}
            />
        )
        expect(container.firstChild).toBeInTheDocument()
        expect(container.querySelector('.loader')).toBeInTheDocument()
    })
})
