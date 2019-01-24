import React, { PureComponent } from 'react'
import Help from './Help'
import styles from './InputRadioCheckbox.module.scss'
import Label from './Label'
import Row from './Row'

interface IOptionProps {
    value: string
    label: string
}

interface IRadioProps {
    required?: boolean
    name: string
    label: string
    help?: string
    type: string
    options: IOptionProps[]
}

export default class InputRadioCheckbox extends PureComponent<IRadioProps> {
    public render() {
        return (
            <Row>
                <Label
                    htmlFor={this.props.name}
                    required={this.props.required ? true : false}
                >
                    {this.props.label}
                </Label>

                <div className={styles.radioGroup}>
                    {/* tslint:disable-next-line:jsx-no-multiline-js */}
                    {this.props.options.map((option, index) => (
                        <div className={styles.radioWrap}>
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

                {this.props.help && <Help>{this.props.help}</Help>}
            </Row>
        )
    }
}
