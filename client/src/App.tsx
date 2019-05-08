import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/organisms/Header'
import Footer from './components/organisms/Footer'
import Spinner from './components/atoms/Spinner'
import { User } from './context'
import Routes from './Routes'
import './styles/global.scss'
import styles from './App.module.scss'

export default class App extends Component {
    public render() {
        return (
            <div className={styles.app}>
                <Router>
                    <>
                        <Header />

                        <main className={styles.main}>
                            {this.context.isLoading ? (
                                <div className={styles.loader}>
                                    <Spinner message={this.context.message} />
                                </div>
                            ) : (
                                <Routes />
                            )}
                        </main>

                        <Footer />
                    </>
                </Router>
            </div>
        )
    }
}

App.contextType = User
