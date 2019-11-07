import React from 'react'
import ReactDOM from 'react-dom'
import Error from './Error'

it('renders without crashing without props', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Error />, div)
    ReactDOM.unmountComponentAtNode(div)
})

it('renders without crashing with message', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Error message="test"/>, div)
    ReactDOM.unmountComponentAtNode(div)
})
