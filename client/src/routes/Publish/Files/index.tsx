import React, { FormEvent, PureComponent, ChangeEvent } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import axios from 'axios'
import { Logger } from '@oceanprotocol/squid'
import Button from '../../../components/atoms/Button'
import Help from '../../../components/atoms/Form/Help'
import ItemForm from './ItemForm'
import Item from './Item'
import Ipfs from './Ipfs'
import styles from './index.module.scss'

import { serviceUri } from '../../../config'
import cleanupContentType from '../../../utils/cleanupContentType'

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
    isIpfsFormShown: boolean
}

export default class Files extends PureComponent<FilesProps, FilesStates> {
    public state: FilesStates = {
        isFormShown: false,
        isIpfsFormShown: false
    }

    // for canceling axios requests
    public signal = axios.CancelToken.source()

    public componentWillUnmount() {
        this.signal.cancel()
    }

    private toggleForm = (e: Event) => {
        e.preventDefault()
        this.setState({ isFormShown: !this.state.isFormShown })
    }

    private toggleIpfsForm = (e: Event) => {
        e.preventDefault()
        this.setState({ isIpfsFormShown: !this.state.isIpfsFormShown })
    }

    private addItem = async (url: string) => {
        const file: File = {
            url,
            contentType: '',
            found: false // non-standard
        }

        try {
            const response = await axios({
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                url: `${serviceUri}/api/v1/urlcheck`,
                data: { url },
                cancelToken: this.signal.token
            })

            const { contentLength, contentType, found } = response.data.result
            file.contentLength = contentLength
            file.contentType = contentType
            file.compression = cleanupContentType(contentType)
            file.found = found
        } catch (error) {
            !axios.isCancel(error) && Logger.error(error.message)
        }

        this.props.files.push(file)
        const event = {
            currentTarget: {
                name: 'files',
                value: this.props.files
            }
        }
        this.props.onChange(event as any)
        this.setState({
            isFormShown: !this.state.isFormShown,
            isIpfsFormShown: !this.state.isIpfsFormShown
        })
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
        const { files, help, placeholder, name, onChange } = this.props
        const { isFormShown, isIpfsFormShown } = this.state

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
                        {isFormShown ? '- Cancel' : '+ Add a file URL'}
                    </Button>

                    <Button link onClick={this.toggleIpfsForm}>
                        {isIpfsFormShown ? '- Cancel' : '+ Add to IPFS'}
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

                    <CSSTransition
                        classNames="grow"
                        in={isIpfsFormShown}
                        timeout={200}
                        unmountOnExit
                        onExit={() => this.setState({ isIpfsFormShown: false })}
                    >
                        <Ipfs addItem={this.addItem} />
                    </CSSTransition>
                </div>
            </>
        )
    }
}
