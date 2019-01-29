import cx from 'classnames'
import React, { PureComponent } from 'react'
import { ReactComponent as SearchIcon } from '../../../img/search.svg'
import Help from './Help'
import styles from './Input.module.scss'
import Label from './Label'
import Row from './Row'

interface IOptionProps {
    value: string
    label: string
}

interface IInputProps {
    name: string
    label: string
    placeholder?: string
    required?: boolean
    help?: string
    tag?: string
    type?: string
    small?: boolean
    options?: IOptionProps[]
    additionalComponent?: void
}

interface IInputState {
    isFocused: boolean
}

const Tag = ({ ...props }) => {
    if (props.tag && props.tag === 'select') {
        return <select className={styles.select} {...props} />
    } else if (props.tag && props.tag === 'textarea') {
        return <textarea className={styles.input} {...props} />
    } else {
        return <input className={styles.input} {...props} />
    }
}

export default class Input extends PureComponent<IInputProps, IInputState> {
    public state: IInputState = { isFocused: false }

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

    public render() {
        const {
            name,
            label,
            required,
            type,
            help,
            small,
            tag,
            additionalComponent,
            children,
            options,
            ...props
        } = this.props

        return (
            <Row>
                <Label htmlFor={name} required={required}>
                    {label}
                </Label>

                {type === 'radio' || type === 'checkbox' ? (
                    <div className={styles.radioGroup}>
                        {/* tslint:disable-next-line:jsx-no-multiline-js */}
                        {options &&
                            options.map((option, index) => (
                                <div className={styles.radioWrap} key={index}>
                                    <input
                                        className={styles.radio}
                                        type={this.props.type}
                                        id={option.value}
                                        name={this.props.name}
                                        value={option.value}
                                    />
                                    <label
                                        className={styles.radioLabel}
                                        htmlFor={option.value}
                                    >
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                    </div>
                ) : (
                    <div className={this.inputWrapClasses()}>
                        <Tag
                            id={name}
                            name={name}
                            required={required}
                            type={type}
                            {...props}
                            onFocus={this.toggleFocus}
                            onBlur={this.toggleFocus}
                        >
                            {/* tslint:disable-next-line:jsx-no-multiline-js */}
                            {tag === 'select'
                                ? options &&
                                  options.map((option, index) => (
                                      <option key={index} value={option.value}>
                                          {option.label}
                                      </option>
                                  ))
                                : children}
                        </Tag>
                        {type === 'search' && <SearchIcon />}
                    </div>
                )}

                {help && <Help>{help}</Help>}

                {additionalComponent && additionalComponent}
            </Row>
        )
    }
}
