import React from 'react'
import ReactDOM from 'react-dom'
import UserProvider from './context/UserProvider'
import App from './App'
import * as serviceWorker from './serviceWorker'

function renderToDOM() {
    const root = document.getElementById('root')

    if (root !== null) {
        ReactDOM.render(
            <UserProvider>
                <App />
            </UserProvider>,
            root
        )
    }
}

export { renderToDOM }

renderToDOM()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
