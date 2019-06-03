import React, { FormEvent, PureComponent, ChangeEvent } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Button from '../../../components/atoms/Button'
import Help from '../../../components/atoms/Form/Help'
import ItemForm from './ItemForm'
import Item from './Item'
import styles from './index.module.scss'

import { serviceUri } from '../../../config'
import cleanupContentType from '../../../utils/cleanupContentType'
import { Logger } from '@oceanprotocol/squid'

export interface File {
    url: string
    contentType: string
    checksum?: string
    checksumType?: string
    contentLength?: number
    resourceId?: string
    encoding?: string
    compression?: string
    found: boolean // non-standard
}

interface FilesProps {
    files: File[]
    placeholder: string
    help?: string
    name: string
    onChange(
        event:
            | ChangeEvent<HTMLInputElement>
            | FormEvent<HTMLInputElement>
            | ChangeEvent<HTMLSelectElement>
            | ChangeEvent<HTMLTextAreaElement>
    ): void
}

interface FilesStates {
    isFormShown: boolean
}

export default class Files extends PureComponent<FilesProps, FilesStates> {
    public state: FilesStates = {
        isFormShown: false
    }

    private toggleForm = (e: Event) => {
        e.preventDefault()

        this.setState({ isFormShown: !this.state.isFormShown })
    }

    private addItem = async (value: string) => {
        let file: File = {
            url: value,
            contentType: '',
            found: false // non-standard
        }

        try {
            const response = await fetch(`${serviceUri}/api/v1/urlcheck`, {
                method: 'POST',
                body: JSON.stringify({ url: value }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const json = await response.json()
            const { contentLength, contentType, found } = json.result

            file.contentLength = contentLength
            file.contentType = contentType
            file.compression = await cleanupContentType(contentType)
            file.found = found
        } catch (error) {
            Logger.error(error.message)
        }

        this.props.files.push(file)
        const event = {
            currentTarget: {
                name: 'files',
                value: this.props.files
            }
        }
        this.props.onChange(event as any)
        this.setState({ isFormShown: !this.state.isFormShown })
    }

    private removeItem = (index: number) => {
        this.props.files.splice(index, 1)
        const event = {
            currentTarget: {
                name: 'files',
                value: this.props.files
            }
        }
        this.props.onChange(event as any)
        this.forceUpdate()
    }

    public render() {
        const { isFormShown } = this.state
        const { files, help, placeholder, name, onChange } = this.props

        return (
            <>
                {help && <Help>{help}</Help>}

                {/* Use hidden input to collect files */}
                <input
                    type="hidden"
                    name={name}
                    value={JSON.stringify(files)}
                    onChange={onChange}
                    data-testid="files"
                />

                <div className={styles.newItems}>
                    {files.length > 0 && (
                        <TransitionGroup
                            component="ul"
                            className={styles.itemsList}
                        >
                            {files.map((item: any, index: number) => (
                                <CSSTransition
                                    key={index}
                                    timeout={400}
                                    classNames="fade"
                                >
                                    <Item
                                        item={item}
                                        removeItem={() =>
                                            this.removeItem(index)
                                        }
                                    />
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                    )}

                    <Button link onClick={this.toggleForm}>
                        {isFormShown ? '- Cancel' : '+ Add a file'}
                    </Button>

                    <CSSTransition
                        classNames="grow"
                        in={isFormShown}
                        timeout={200}
                        unmountOnExit
                        onExit={() => this.setState({ isFormShown: false })}
                    >
                        <ItemForm
                            placeholder={placeholder}
                            addItem={this.addItem}
                        />
                    </CSSTransition>
                </div>
            </>
        )
    }
}
