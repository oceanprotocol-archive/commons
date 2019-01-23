import React, { Component } from 'react'
import styles from './App.module.scss'
import { User, userDefaults } from './context/User'
import './styles/global.scss'

import Routes from './Routes'

class App extends Component {
    public render() {
        return (
            <div className={styles.app}>
                <User.Provider value={userDefaults}>
                    <Routes />
                </User.Provider>
            </div>
        )
    }
}

export default App
