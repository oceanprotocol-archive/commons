import React, { Component } from 'react'
import Button from '../components/atoms/Button'
import Input from '../components/atoms/Form/Input'
import styles from './Home.module.scss'

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

                <form className={styles.form}>
                    <fieldset>
                        <Input
                            name="hellotext"
                            label="Hello Text"
                            placeholder="Hello placeholder"
                            type="text"
                            required={true}
                        />
                        <Input
                            name="hellotextwithhelp"
                            label="Hello Text with Help"
                            placeholder="Hello placeholder"
                            type="text"
                            required={true}
                            help="Help me Obiwan."
                        />
                        <Input
                            name="hellosearch"
                            label="Hello Search"
                            placeholder="Hello placeholder"
                            type="search"
                        />
                        <Input
                            name="helloselect"
                            label="Hello Select"
                            tag="select"
                        >
                            <option value="0">---</option>
                            <option value="1">Hello Option</option>
                            <option value="2">Hello Option</option>
                        </Input>
                        <Input
                            name="hellotextarea"
                            label="Hello Textarea"
                            placeholder="Hello placeholder"
                            tag="textarea"
                        />
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default Home
