import cx from 'classnames'
import React, { PureComponent } from 'react'
import slugify from 'slugify'
import { ReactComponent as SearchIcon } from '../../../img/search.svg'
import Help from './Help'
import styles from './Input.module.scss'
import Label from './Label'
import Row from './Row'
import InputGroup from './InputGroup'

interface InputProps {
    name: string
    label: string
    placeholder?: string
    required?: boolean
    help?: string
    tag?: string
    type?: string
    options?: string[]
    additionalComponent?: any
    value?: string
    onChange?: any
    rows?: number
    group?: any
}

interface InputState {
    isFocused: boolean
}

export default class Input extends PureComponent<InputProps, InputState> {
    public state: InputState = { isFocused: false }

    public inputWrapClasses() {
        if (this.props.type === 'search') {
            return styles.inputWrapSearch
        } else if (this.props.type === 'search' && this.state.isFocused) {
            return cx(styles.inputWrapSearch, styles.isFocused)
        } else if (this.state.isFocused && this.props.type !== 'search') {
            return cx(styles.inputWrap, styles.isFocused)
        } else {
            return styles.inputWrap
        }
    }

    public toggleFocus = () => {
        this.setState({ isFocused: !this.state.isFocused })
    }

    public InputComponent = () => {
        const { type, options, group, name } = this.props

        if (type === 'select') {
            return (
                <div className={this.inputWrapClasses()}>
                    <select className={styles.select} {...this.props}>
                        <option value="none">---</option>
                        {options &&
                            options.map((option: string, index: number) => (
                                <option
                                    key={index}
                                    value={slugify(option, {
                                        lower: true
                                    })}
                                >
                                    {option}
                                </option>
                            ))}
                    </select>
                </div>
            )
        } else if (type === 'textarea') {
            return (
                <div className={this.inputWrapClasses()}>
                    <textarea className={styles.input} {...this.props} />
                </div>
            )
        } else if (type === 'radio' || type === 'checkbox') {
            return (
                <div className={styles.radioGroup}>
                    {options &&
                        options.map((option: string, index: number) => (
                            <div className={styles.radioWrap} key={index}>
                                <input
                                    className={styles.radio}
                                    id={slugify(option, {
                                        lower: true
                                    })}
                                    name={name}
                                    value={slugify(option, {
                                        lower: true
                                    })}
                                />
                                <label
                                    className={styles.radioLabel}
                                    htmlFor={slugify(option, {
                                        lower: true
                                    })}
                                >
                                    {option}
                                </label>
                            </div>
                        ))}
                </div>
            )
        }

        return (
            <div className={this.inputWrapClasses()}>
                {group ? (
                    <InputGroup>
                        <input className={styles.input} {...this.props} />
                        {group}
                    </InputGroup>
                ) : (
                    <input className={styles.input} {...this.props} />
                )}

                {type === 'search' && <SearchIcon />}
            </div>
        )
    }

    public render() {
        const { name, label, required, help, additionalComponent } = this.props

        return (
            <Row>
                <Label htmlFor={name} required={required}>
                    {label}
                </Label>

                <this.InputComponent />

                {help && <Help>{help}</Help>}

                {additionalComponent && additionalComponent}
            </Row>
        )
    }
}
