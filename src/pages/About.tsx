import React, { Component } from 'react'
import Button from '../components/atoms/Button'
import styles from './About.module.scss'

class About extends Component {
    public render() {
        return (
            <div className={styles.about}>

                <Button>I am a button</Button>
                <Button primary={true}>I am a primary button</Button>
                <Button href="https://hello.com">
                    I am a link disguised as a button
                </Button>

            </div>
        )
    }
}

export default About
