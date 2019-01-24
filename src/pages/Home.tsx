import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from './Home.module.scss'

class Home extends Component {
    public render() {
        return (
            <div className={styles.home}>
                <div>Home</div>

                <Link to={'/styleguide'}>Styleguide</Link>
            </div>
        )
    }
}

export default Home
