import React, { PureComponent } from 'react'
import isUrl from 'is-url'
import Input from '../../../components/atoms/Form/Input'
import Button from '../../../components/atoms/Button'
import styles from './ItemForm.module.scss'

interface ItemFormProps {
    addItem: any
    placeholder: string
}

interface ItemFormStates {
    url: string
    hasError: boolean
    noUrl: boolean
}

export default class ItemForm extends PureComponent<
    ItemFormProps,
    ItemFormStates
> {
    public state: ItemFormStates = {
        url: '',
        hasError: false,
        noUrl: false
    }

    public handleSubmit = (e: Event) => {
        e.preventDefault()

        const { url } = this.state

        // return when required fields are empty, and url value is no url
        // Can't use browser validation cause we are in a form within a form
        if (!url) {
            this.setState({ hasError: true })
            return
        }

        if (url && !isUrl(url)) {
            this.setState({ noUrl: true })
            return
        }

        this.props.addItem(url)
    }

    public onChangeUrl = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({ url: e.currentTarget.value })
        this.clearErrors()
    }

    public clearErrors() {
        if (this.state.hasError) this.setState({ hasError: false })
        if (this.state.noUrl) this.setState({ noUrl: true })
    }

    public render() {
        const { url, hasError, noUrl } = this.state

        return (
            <div className={styles.itemForm}>
                <Input
                    label="Url"
                    name="url"
                    required
                    type="url"
                    placeholder={this.props.placeholder}
                    value={url}
                    onChange={this.onChangeUrl}
                />

                <Button onClick={(e: Event) => this.handleSubmit(e)}>
                    Add File
                </Button>

                {hasError && (
                    <span className={styles.error}>
                        Please fill in all required fields.
                    </span>
                )}
                {noUrl && (
                    <span className={styles.error}>
                        Please enter a valid URL.
                    </span>
                )}
            </div>
        )
    }
}
