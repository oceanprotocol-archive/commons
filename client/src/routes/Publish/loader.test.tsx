import React from 'react'
import { render } from 'react-testing-library'
import Loader from './loader'

describe('Progress', () => {
    it('renders without crashing', () => {
        const { container, getByText } = render(<Loader loadType={"dataset"} toSelect={()=>{}}/>)
        expect(container.firstChild).toBeInTheDocument()
        expect(getByText('Next →'))
    })
})
