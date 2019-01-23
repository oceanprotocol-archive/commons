import React from 'react'
import ReactDOM from 'react-dom'

import FormHelp from './FormHelp'

it('FormHelp renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <FormHelp>Price of your data set asset in Ocean Tokens.</FormHelp>,
        div
    )
    ReactDOM.unmountComponentAtNode(div)
})
