import React, { Component } from 'react'
import Button from '../components/atoms/Button'
import Form from '../components/atoms/Form/Form'
import Input from '../components/atoms/Form/Input'
import Page from '../templates/Page'

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
                type={value.type}
                help={value.help}
                options={value.options}
            />
        ))

    public render() {
        const entries = Object.entries(form.fields)
        return (
            <Page title="Styleguide">
                <Button>I am a button</Button>
                <Button primary>I am a primary button</Button>
                <Button href="https://hello.com">
                    I am a link disguised as a button
                </Button>

                <Form title={form.title} description={form.description}>
                    {this.formFields(entries)}
                </Form>
            </Page>
        )
    }
}

export default Styleguide
