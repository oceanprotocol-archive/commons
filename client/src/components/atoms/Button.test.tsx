import React from 'react'
import ReactDOM from 'react-dom'
import Button from './Button'

it('Button renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <>
            <Button>I am a button</Button>
            <Button primary>I am a primary button</Button>
            <Button href="https://hello.com">I am a button</Button>
        </>,
        div
    )
    ReactDOM.unmountComponentAtNode(div)
})
