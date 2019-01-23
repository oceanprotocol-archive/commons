import React, { PureComponent } from 'react'
import { ReactComponent as SearchIcon } from '../../../svg/search.svg'
import FormHelp from './FormHelp'
import styles from './FormInput.module.scss'

interface IFormInputProps {
    name: string
    label: string
    placeholder: string
    required?: boolean
    help?: string
    tag?: string
    type: string
    small?: boolean
    additionalComponent?: void
}

interface IFormInputState {
    isFocused: boolean
}

export default class FormInput extends PureComponent<
    IFormInputProps,
    IFormInputState
> {
    public state: IFormInputState = { isFocused: false }

    public inputWrapClasses() {
        if (this.props.type === 'search') {
            return 'input-wrap input-wrap-search'
        } else if (this.props.type === 'search' && this.state.isFocused) {
            return 'input-wrap input-wrap-search is-focused'
        } else if (this.state.isFocused && this.props.type !== 'search') {
            return 'input-wrap is-focused'
        } else {
            return 'input-wrap'
        }
    }

    public handleBlur() {
        this.setState({ isFocused: true })
    }

    public handleFocus() {
        this.setState({ isFocused: false })
    }

    public render() {
        const {
            name,
            label,
            required,
            type,
            help,
            small,
            additionalComponent,
            ...props
        } = this.props

        return (
            <div className={styles.formGroup}>
                <label
                    htmlFor={name}
                    className={styles.label}
                    title={required ? 'Required' : ''}
                >
                    {label}
                </label>
                <div className={this.inputWrapClasses()}>
                    <input
                        className={small ? 'input input-sm' : 'input'}
                        id={name}
                        name={name}
                        required={required}
                        type={type}
                        {...props}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                    />
                    {type === 'search' && <SearchIcon />}
                </div>
                {help && <FormHelp>{help}</FormHelp>}

                {additionalComponent && additionalComponent}
            </div>
        )
    }
}
