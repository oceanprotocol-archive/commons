import React, { FormEvent, PureComponent, ChangeEvent } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Button from '../../../components/atoms/Button'
import Help from '../../../components/atoms/Form/Help'
import ItemForm from './ItemForm'
import Item from './Item'
import styles from './index.module.scss'

import { serviceHost, servicePort, serviceScheme } from '../../../config'

interface File {
    url: string
    found: boolean
    checksum?: string
    checksumType?: string
    contentLength?: number
    contentType?: string
    resourceId?: string
    encoding?: string
    compression?: string
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

export const getFileCompression = async (contentType: string) => {
    // TODO: add all the possible archive & compression MIME types
    if (
        contentType === 'application/zip' ||
        contentType === 'application/gzip' ||
        contentType === 'application/x-lzma' ||
        contentType === 'application/x-xz' ||
        contentType === 'application/x-tar' ||
        contentType === 'application/x-gtar' ||
        contentType === 'application/x-bzip2' ||
        contentType === 'application/x-7z-compressed' ||
        contentType === 'application/x-rar-compressed' ||
        contentType === 'application/x-apple-diskimage'
    ) {
        const contentTypeSplit = contentType.split('/')

        if (contentTypeSplit[1].includes('x-')) {
            return contentTypeSplit[1].replace('x-', '')
        }

        return contentTypeSplit[1]
    } else {
        return 'none'
    }
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
        let res: {
            result: {
                contentLength: number
                contentType: string
                found: boolean
            }
        }

        let file: File = {
            url: value,
            found: false,
            contentLength: 0,
            contentType: '',
            compression: ''
        }

        try {
            const response = await fetch(
                `${serviceScheme}://${serviceHost}:${servicePort}/api/v1/urlcheck`,
                {
                    method: 'POST',
                    body: JSON.stringify({ url: value }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            res = await response.json()
            file.contentLength = res.result.contentLength
            file.contentType = res.result.contentType
            file.compression = await getFileCompression(res.result.contentType)
            file.found = res.result.found
        } catch (error) {
            // error
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
