import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/organisms/Header'
import Footer from './components/organisms/Footer'
import Spinner from './components/atoms/Spinner'
import { User } from './context'
import UserProvider from './context/UserProvider'
import Routes from './Routes'
import './styles/global.scss'
import styles from './App.module.scss'

export default class App extends Component {
    public render() {
        return (
            <div className={styles.app}>
                <UserProvider>
                    <Router>
                        <>
                            <Header />

                            <main className={styles.main}>
                                <User.Consumer>
                                    {states =>
                                        states.isLoading ? (
                                            <div className={styles.loader}>
                                                <Spinner
                                                    message={states.message}
                                                />
                                            </div>
                                        ) : (
                                            <Routes />
                                        )
                                    }
                                </User.Consumer>
                            </main>

                            <Footer />
                        </>
                    </Router>
                </UserProvider>
            </div>
        )
    }
}
