import React, { PureComponent } from 'react'
import { Logger } from '@oceanprotocol/squid'
import filesize from 'filesize'
import { User } from '../../context/User'
import Button from '../../components/atoms/Button'
import Spinner from '../../components/atoms/Spinner'
import styles from './AssetFile.module.scss'
import ReactGA from 'react-ga'

interface AssetFileProps {
    file: any
    ddo: any
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
        message: 'Decrypting file, please sign...'
    }

    private resetState = () => this.setState({ isLoading: true, error: '' })

    private purchaseAsset = async (ddo: any, index: number) => {
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
                action: 'purchaseAsset-error ' + error
            })
        }
    }

    public render() {
        const { ddo, file } = this.props

        return (
            <div className={styles.fileWrap}>
                <ul key={file.index} className={styles.file}>
                    <li>
                        {file.contentType && file.contentType.split('/')[1]}
                    </li>
                    <li>
                        {file.contentLength && filesize(file.contentLength)}
                    </li>
                    {/* <li>{file.encoding}</li> */}
                    {/* <li>{file.compression}</li> */}
                </ul>

                {this.state.isLoading ? (
                    <Spinner message={this.state.message} />
                ) : (
                    <Button
                        primary
                        className={styles.buttonMain}
                        onClick={() => this.purchaseAsset(ddo, file.index)}
                    >
                        Get file
                    </Button>
                )}

                {this.state.error !== '' && (
                    <div className={styles.error}>{this.state.error}</div>
                )}
            </div>
        )
    }
}

AssetFile.contextType = User
