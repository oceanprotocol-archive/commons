import React from 'react'
import { render } from '@testing-library/react'
import Item from './Item'

describe('Item', () => {
    it('renders without crashing', () => {
        const item = {
            url: 'https://hello.com/hello.zip',
            found: true,
            contentType: 'application/zip',
            contentLength: '10'
        }
        const { container } = render(
            <Item item={item} removeItem={() => null} />
        )
        expect(container.firstChild).toBeInTheDocument()
    })

    it('returns unknown strings', () => {
        const item = {
            url: 'https://hello.com/hello.zip',
            found: false,
            contentType: '',
            contentLength: '10'
        }
        const { container } = render(
            <Item item={item} removeItem={() => null} />
        )
        expect(container.querySelector('.details')).toHaveTextContent(
            'unknown type'
        )
        expect(container.querySelector('.details')).toHaveTextContent(
            'unknown size'
        )
        expect(container.querySelector('.details')).toHaveTextContent(
            'not confirmed'
        )
    })
})
