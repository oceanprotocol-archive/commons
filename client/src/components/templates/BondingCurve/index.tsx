import React, { PureComponent } from 'react'
import Web3 from 'web3'
import PropTypes from 'prop-types'
import ErrorBoundary from 'react-error-boundary'
// import { getWeb3 } from '../utils/getWeb3'
import styles from './index.module.scss'
import BondingCurveChart from './BondingCurveChart'
import TimelineChart from './TimelineChart'
import ErrorComponent from './Error'
import Loader from './Loader'

import 'react-vis/dist/style.css'
import { timeFormatDefaultLocale } from 'd3-time-format'
import english from 'd3-time-format/locale/en-US.json'

// To prevent overflowing of large month names
timeFormatDefaultLocale({
    ...english,
    months: english.shortMonths
})

interface BondingCurveProps {
    web3?: Web3 //TODO make it required when contract is implemented
    defaultTab: string
    contractAddress: string
    contractArtifact: any
    height: number
    onError: (error: string) => void
    onLoaded: () => void
}

interface BondingCurveState {
    activeTab: string
    contract: any
    contractAddress: string | undefined
    error: string | undefined
    loading: boolean
}

export default class BondingCurve extends PureComponent<BondingCurveProps, BondingCurveState> {
    // static propTypes = {
    //     defaultTab: PropTypes.string,
    //     contractAddress: PropTypes.string.isRequired,
    //     contractArtifact: PropTypes.object.isRequired,
    //     height: PropTypes.number,
    //     onError: PropTypes.func,
    //     onLoaded: PropTypes.func
    // }

    static defaultProps = {
        height: 200,
        onLoaded: () => { }
    }

    state = {
        activeTab: this.props.defaultTab || 'timeline',
        contract: {},
        contractAddress: undefined,
        error: undefined,
        loading: false //TODO: change it to true when contract is implemented
    }

    componentDidMount = async () => {
        try {
            //TODO: enable it when contract is implemented
            // await this.getContract(this.props)
        } catch (error) {
            this.setState({ error, loading: false })
        }
    };

    componentDidUpdate = async (prevProps: BondingCurveProps) => {
        try {
            if (this.props.contractAddress !== prevProps.contractAddress) {
                //TODO: enable it when contract is implemented
                // await this.getContract(this.props)
            }
        } catch (error) {
            this.setState({ error, loading: false })
        }
    };

    getContract = async (props: BondingCurveProps) => {
        const { web3, contractAddress, contractArtifact, onLoaded } = props
        // const { contractAddress, contractArtifact, onLoaded } = props

        // Reset state
        this.setState({
            contract: null,
            contractAddress: undefined,
            error: undefined,
            loading: true
        })

        //TODO: enable it when contract is implemented
        // try {
        //     // Get network provider and web3 instance.
        //     // const web3 = getWeb3()


        //     // Check if connected
        //     await web3.eth.net.isListening()

        //     if (!web3.utils.isAddress(contractAddress)) {
        //         this.setState({
        //             error: 'Invalid address',
        //             loading: false
        //         })
        //     } else {
        //         const contract = new web3.eth.Contract(contractArtifact.abi, contractAddress)

        //         const code = await web3.eth.getCode(contractAddress)

        //         if (code === '0x') {
        //             this.setState({
        //                 error: 'Invalid contract',
        //                 loading: false
        //             })
        //         } else {
        //             onLoaded()
        //             this.setState({ contract, loading: false })
        //         }
        //     }
        // } catch (error) {
        //     throw error
        // }
    }

    toggleTab(tabName: string) {
        this.setState({
            activeTab: tabName
        })
    }

    renderErrorComponent = (error: any) => {
        const { height, onError } = this.props

        let message = error
        let originalMessage = error

        if (error.error || error.message) {
            originalMessage = error.message || error.error.message
            console.error(error.message || error.error.message)
            message = 'An error has occurred'
        } else {
            console.error(message)
        }

        if (onError) {
            onError(originalMessage)
            return null
        }

        return (
            <ErrorComponent
                message={message}
                height={height} />
        )
    }

    render() {
        return (
            <div className={styles.bondingModule}>
                {this.renderContent()}
            </div>
        )
    }

    renderContent = () => {
        const { activeTab, error, loading, contract } = this.state
        const { web3, contractAddress, height } = this.props

        if (loading) return <Loader style={{ minHeight: height }} />

        // Unable to load contract
        //TODO: enable it when contract is implemented
        // if (!loading && !web3 && !error) return null

        const isActive = (key: string) => activeTab === key

        const Tab = isActive('timeline') ? TimelineChart : BondingCurveChart

        return (
            <>
                <ul className={styles.tabs}>
                    <li>
                        <button
                            className={isActive('bonding-curve') ? styles.tab__active : styles.tab}
                            onClick={this.toggleTab.bind(this, 'bonding-curve')}>
                            Bonding Curve
                        </button>
                    </li>
                    <li>
                        <button
                            className={isActive('timeline') ? styles.tab__active : styles.tab}
                            onClick={this.toggleTab.bind(this, 'timeline')}>
                            Stake History
                        </button>
                    </li>
                </ul>

                <ErrorBoundary
                    FallbackComponent={this.renderErrorComponent}>

                    {
                        error ? this.renderErrorComponent(error) : null
                    }

                    {
                        /*TODO: web3 && !error && contract && (
                            <div className={styles.Tab_content}>
                                <Tab
                                    key={activeTab}
                                    web3={web3}
                                    height={height}
                                    contractAddress={contractAddress}
                                    bondingCurveContract={contract}
                                />
                            </div>
                        )*/
                        <div className={styles.Tab_content}>
                            <Tab
                                key={activeTab}
                                web3={web3}
                                height={height}
                                contractAddress={contractAddress}
                                bondingCurveContract={contract}
                            />
                        </div>
                    }
                </ErrorBoundary>
            </>
        )
    }
}
