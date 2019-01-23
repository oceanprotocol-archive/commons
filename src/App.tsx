import React, { Component } from 'react'
import './App.css'
import { User, userDefaults } from './context/User'
import Routes from './Routes'

class App extends Component {
    public render() {
        return (
            <User.Provider value={userDefaults}>
                <Routes />
            </User.Provider>
        )
    }
}

export default App
