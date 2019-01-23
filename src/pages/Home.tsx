import React, { Component } from 'react'
import Button from '../components/atoms/Button'
import styles from './Home.module.scss'

// retrieve by tag? category?
// search input -> redirect to list

class Home extends Component {
    public render() {
        return (
            <div className={styles.home}>
                <div>Home</div>

                <Button>I am a button</Button>
                <Button primary={true}>I am a primary button</Button>
                <Button href="https://hello.com">
                    I am a link disguised as a button
                </Button>
            </div>
        )
    }
}

export default Home
