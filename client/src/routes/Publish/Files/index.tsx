import React, {
    lazy,
    Suspense,
    FormEvent,
    PureComponent,
    ChangeEvent
} from 'react'
import axios from 'axios'
import { Logger, File } from '@oceanprotocol/squid'
import shortid from 'shortid'
import Button from '../../../components/atoms/Button'
import Help from '../../../components/atoms/Form/Help'
import ItemForm from './ItemForm'
import Item from './Item'
import styles from './index.module.scss'

import { serviceUri } from '../../../config'
import cleanupContentType from '../../../utils/cleanupContentType'
import Spinner from '../../../components/atoms/Spinner'

const Ipfs = lazy(() => import('./Ipfs'))

export interface FilePublish extends File {
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

const buttons = [
    {
        id: 'url',
        title: '+ From URL',
        titleActive: '- Cancel'
    },
    {
        id: 'ipfs',
        title: '+ Add to IPFS',
        titleActive: '- Cancel'
    }
]

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

    private toggleForm = (e: Event, form: string) => {
        e.preventDefault()

        this.setState({
            isFormShown: form === 'url' ? !this.state.isFormShown : false,
            isIpfsFormShown:
                form === 'ipfs' ? !this.state.isIpfsFormShown : false
        })
    }

    private async getFile(url: string) {
        const file: FilePublish = {
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

            if (contentLength) file.contentLength = contentLength
            if (contentType) {
                file.contentType = contentType
                file.compression = cleanupContentType(contentType)
            }

            file.found = found

            return file
        } catch (error) {
            !axios.isCancel(error) && Logger.error(error.message)
        }
    }

    private addFile = async (url: string) => {
        // check for duplicate urls
        const duplicateFiles = this.props.files.filter(props =>
            url.includes(props.url)
        )

        if (duplicateFiles.length > 0) {
            return this.setState({
                isFormShown: false,
                isIpfsFormShown: false
            })
        }

        const file: FilePublish | undefined = await this.getFile(url)
        file && this.props.files.push(file)

        const event = {
            currentTarget: {
                name: 'files',
                value: this.props.files
            }
        }
        this.props.onChange(event as any)

        this.setState({
            isFormShown: false,
            isIpfsFormShown: false
        })

        this.forceUpdate()
    }

    private removeFile = (index: number) => {
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
                        <ul className={styles.itemsList}>
                            {files.map((item: any, index: number) => (
                                <Item
                                    key={shortid.generate()}
                                    item={item}
                                    removeFile={() => this.removeFile(index)}
                                />
                            ))}
                        </ul>
                    )}

                    {buttons.map(button => {
                        const isActive =
                            (button.id === 'url' && isFormShown) ||
                            (button.id === 'ipfs' && isIpfsFormShown)

                        return (
                            <Button
                                key={shortid.generate()}
                                link
                                onClick={(e: Event) =>
                                    this.toggleForm(e, button.id)
                                }
                            >
                                {isActive ? button.titleActive : button.title}
                            </Button>
                        )
                    })}

                    {isFormShown && (
                        <ItemForm
                            placeholder={placeholder}
                            addFile={this.addFile}
                        />
                    )}

                    {isIpfsFormShown && (
                        <Suspense fallback={<Spinner message="Loading..." />}>
                            <Ipfs addFile={this.addFile} />
                        </Suspense>
                    )}
                </div>
            </>
        )
    }
}
