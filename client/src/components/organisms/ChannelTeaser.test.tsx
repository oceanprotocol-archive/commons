import React from 'react'
import { render } from 'react-testing-library'
import ChannelTeaser from './ChannelTeaser'
import { BrowserRouter } from 'react-router-dom'

describe('ChannelTeaser', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <BrowserRouter>
                <ChannelTeaser channel="ai-for-good" />
            </BrowserRouter>
        )
        expect(container.firstChild).toBeInTheDocument()
    })
})
