import React, { Component } from 'react'
import Button from '../components/atoms/Button'
import Input from '../components/atoms/Form/Input'
import InputRadioCheckbox from '../components/atoms/Form/InputRadioCheckbox'
import styles from './Styleguide.module.scss'

const radioOptions = [
    {
        value: 'provider',
        label: 'I can provide data'
    },
    {
        value: 'consumer',
        label: 'I want to use data'
    }
]

const checkboxOptions = [
    {
        value: 'provider2',
        label: 'I can provide data'
    },
    {
        value: 'consumer2',
        label: 'I want to use data'
    }
]

class Styleguide extends Component {
    public render() {
        return (
            <div className={styles.page}>
                <h1>Styleguide</h1>

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
                        <InputRadioCheckbox
                            name="helloradio"
                            label="Hello Radios"
                            type="radio"
                            options={radioOptions}
                        />
                        <InputRadioCheckbox
                            name="hellocheckbox"
                            label="Hello Checkboxes"
                            type="checkbox"
                            options={checkboxOptions}
                        />
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default Styleguide
