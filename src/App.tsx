import React, { Component } from 'react'
import './App.css'
import { User, userDefults } from './context/User'
import Routes from './Routes'

class App extends Component {
    public render() {
        return (
            <User.Provider value={userDefults}>
                <Routes />
            </User.Provider>
        )
    }
}

export default App
