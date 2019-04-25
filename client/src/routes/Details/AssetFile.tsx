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
    message: string
    error: string
    step: number | null
}

export default class AssetFile extends PureComponent<
    AssetFileProps,
    AssetFileState
> {
    public state = {
        isLoading: false,
        message: '',
        error: '',
        step: null
    }

    private feedbackMessage = (step: number | null) => {
        // events from squid-js for `ocean.assets.order`:
        // 0 Preparing
        // 1 Prepared
        // 2 SendingAgreement
        // 3 AgreementInitialized
        // 4 LockingPayment
        // 5 LockedPayment
        switch (step) {
            case 0:
                return '1/4<br />Asking for agreement signature...'
            case 1:
                return '1/4<br />Confirmed agreement signature.'
            case 2:
                return '2/4<br />Sending agreement request...'
            case 3:
                return '2/4<br />Agreement initialized.'
            case 4:
                return '3/4<br />Asking for two payment confirmations...'
            case 5:
                return '3/4<br />Payment confirmed. Requesting access...'
            default:
                return this.state.message
        }
    }

    private resetState = () =>
        this.setState({ isLoading: true, message: '', error: '', step: null })

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

            const agreementId = await ocean.assets
                .order(ddo.id, service.serviceDefinitionId, accounts[0])
                .next((step: number) => this.setState({ step }))

            this.setState({
                step: null,
                message: '4/4<br /> Access granted. Consuming file...'
            })

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
        const { isLoading, message, error, step } = this.state
        const { isLogged, isOceanNetwork } = this.context
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
                    <Spinner message={this.feedbackMessage(step)} />
                ) : (
                    <Button
                        primary
                        className={styles.buttonMain}
                        // TODO: remove the || 0 once hack
                        // https://github.com/oceanprotocol/squid-js/pull/221
                        // is released
                        onClick={() => this.purchaseAsset(ddo, index || 0)}
                        disabled={!isLogged || !isOceanNetwork}
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
