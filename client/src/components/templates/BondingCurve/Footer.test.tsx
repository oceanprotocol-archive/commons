import React from 'react'
import ReactDOM from 'react-dom'
import Footer from './Footer'

it('renders without crashing without props', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Footer />, div)
    ReactDOM.unmountComponentAtNode(div)
})

it('renders without crashing with details', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Footer detail={{ title: 'test', sub: 'sub' }} />, div)
    ReactDOM.unmountComponentAtNode(div)
})

it('renders without crashing with children', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Footer><h1>Test</h1></Footer>, div)
    ReactDOM.unmountComponentAtNode(div)
})

it('renders without crashing with symbol', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Footer symbol={'TEST'} />, div)
    ReactDOM.unmountComponentAtNode(div)
})
