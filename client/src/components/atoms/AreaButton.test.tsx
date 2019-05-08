import React from 'react'
import { render } from 'react-testing-library'
import AreaButton from './AreaButton'

describe('AreaButton', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <AreaButton
                title={"title"}
                description={"description"}
                action={() => Promise.resolve()}
                image={""}
            />
        )
        expect(container.firstChild).toBeInTheDocument()
        container.firstChild && expect(container.firstChild.nodeName).toBe('DIV')
    })
})
