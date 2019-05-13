import React, { PureComponent } from 'react'
import { Logger, DDO, File } from '@oceanprotocol/squid'
import filesize from 'filesize'
import Button from '../../components/atoms/Button'
import Spinner from '../../components/atoms/Spinner'
import { User } from '../../context'
import styles from './AssetFile.module.scss'
import ReactGA from 'react-ga'

interface AssetFileProps {
    file: File
    ddo: DDO
}

interface AssetFileState {
    isLoading: boolean
    error: string
    message: string
}

export default class AssetFile extends PureComponent<
    AssetFileProps,
    AssetFileState
> {
    public state = {
        isLoading: false,
        error: '',
        message: 'Decrypting file URL, please sign...'
    }

    private resetState = () => this.setState({ isLoading: true, error: '' })

    private purchaseAsset = async (ddo: DDO, index: number) => {
        this.resetState()

        ReactGA.event({
            category: 'Purchase',
            action: 'purchaseAsset-start ' + ddo.id
        })

        const { ocean } = this.context

        try {
            const accounts = await ocean.accounts.list()
            const service = ddo.findServiceByType('Access')
            const agreementId = await ocean.assets.order(
                ddo.id,
                service.serviceDefinitionId,
                accounts[0]
            )

            const path = await ocean.assets.consume(
                agreementId,
                ddo.id,
                service.serviceDefinitionId,
                accounts[0],
                '',
                index
            )
            Logger.log('path', path)
            ReactGA.event({
                category: 'Purchase',
                action: 'purchaseAsset-end ' + ddo.id
            })
            this.setState({ isLoading: false })
        } catch (error) {
            Logger.log('error', error)
            this.setState({ isLoading: false, error: error.message })
            ReactGA.event({
                category: 'Purchase',
                action: 'purchaseAsset-error ' + error.message
            })
        }
    }

    public render() {
        const { ddo, file } = this.props
        const { isLoading, message, error } = this.state
        const { isLogged, isCorrectNetwork } = this.context
        const { index } = file

        return (
            <div className={styles.fileWrap}>
                <ul key={index} className={styles.file}>
                    <li>
                        {file.contentType && file.contentType.split('/')[1]}
                    </li>
                    <li>
                        {file.contentLength && filesize(file.contentLength)}
                    </li>
                    {/* <li>{file.encoding}</li> */}
                    {/* <li>{file.compression}</li> */}
                </ul>

                {isLoading ? (
                    <Spinner message={message} />
                ) : (
                    <Button
                        primary
                        className={styles.buttonMain}
                        // TODO: remove the || 0 once hack
                        // https://github.com/oceanprotocol/squid-js/pull/221
                        // is released
                        onClick={() => this.purchaseAsset(ddo, index || 0)}
                        disabled={!isLogged || !isCorrectNetwork}
                    >
                        Get file
                    </Button>
                )}

                {error !== '' && <div className={styles.error}>{error}</div>}
            </div>
        )
    }
}

AssetFile.contextType = User
