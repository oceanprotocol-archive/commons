import React, { Component } from 'react'
import Button from '../components/atoms/Button'
import Form from '../components/atoms/Form/Form'
import Input from '../components/atoms/Form/Input'
import Route from '../components/templates/Route'
import styles from './Styleguide.module.scss'
import form from '../data/form-styleguide.json'
import Content from '../components/atoms/Content'
import withTracker from '../hoc/withTracker'

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
            <Route title="Styleguide" className={styles.styleguide}>
                <Content>
                    <div className={styles.buttons}>
                        <Button>I am a button</Button>
                        <Button primary>I am a primary button</Button>
                        <Button href="https://hello.com">
                            I am a link disguised as a button
                        </Button>
                        <Button link>
                            I am a button disguised as a text link
                        </Button>
                    </div>

                    <Form title={form.title} description={form.description}>
                        {this.formFields(entries)}
                    </Form>
                </Content>
            </Route>
        )
    }
}

export default withTracker(Styleguide)
