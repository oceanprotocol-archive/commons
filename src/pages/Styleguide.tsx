import React, { Component } from 'react'
import Button from '../components/atoms/Button'
import Form from '../components/atoms/Form/Form'
import Input from '../components/atoms/Form/Input'
import styles from './Styleguide.module.scss'

import form from '../data/form-styleguide.json'

class Styleguide extends Component {
    public formFields = (entries: any[]) =>
        entries.map(([key, value]) => (
            <Input
                key={key}
                name={key}
                label={value.label}
                placeholder={value.placeholder}
                required={value.required}
                tag={value.tag}
                type={value.type}
                help={value.help}
            />
        ))

    public render() {
        const entries = Object.entries(form.fields)
        return (
            <div className={styles.page}>
                <h1>Styleguide</h1>

                <Button>I am a button</Button>
                <Button primary>I am a primary button</Button>
                <Button href="https://hello.com">
                    I am a link disguised as a button
                </Button>

                <Form title={form.title} description={form.description}>
                    {this.formFields(entries)}
                </Form>
            </div>
        )
    }
}

export default Styleguide
