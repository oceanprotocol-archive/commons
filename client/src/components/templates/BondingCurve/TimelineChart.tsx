import React, { PureComponent } from 'react'
import Web3 from 'web3'
import PropTypes from 'prop-types'
import { BigNumber as BN } from 'bignumber.js'
import cn from 'classnames'
import moment from 'moment'
import Footer from './Footer'
import ReactVisTimeline from './ReactVisTimeline'
import styles from './TimelineChart.module.scss'

interface TimelineChartProps {
    bondingCurveContract: any
    web3?: Web3 //TODO make it required when contract is implemented
    height: number
    contractAddress: string
    tokenSymbol?: string
}

interface TimelineChartState {
    minDomain: number
    selectedItem: any
    data: Array<any>
    activeFilter: string
    maxValue: number
    error: any

}

export default class TimelineChart extends PureComponent<TimelineChartProps, TimelineChartState> {
    // static propTypes = {
    //     bondingCurveContract: PropTypes.object.isRequired,
    //     web3: PropTypes.object.isRequired,
    //     height: PropTypes.number.isRequired,
    //     contractAddress: PropTypes.string.isRequired
    // }

    state = {
        minDomain: 0,
        selectedItem: {} as any,
        data: [],
        activeFilter: 'MAX',
        maxValue: 0,
        error: null
    }

    filters = ['1D', '5D', '1M', '1Y', 'MAX']

    async componentDidMount() {
        try {
            await this.getData(this.props)
        } catch (error) {
            this.setState({ error })
        }
    }

    async componentDidUpdate(prevProps: TimelineChartProps) {
        try {
            if (prevProps.contractAddress !== this.props.contractAddress) {
                this.setState({
                    data: []
                }, () => {
                    this.getData(this.props)
                })
            }
        } catch (error) {
            this.setState({ error })
        }
    }

    getData = async (props: TimelineChartProps) => {
        console.log('===getData')
        //TODO: enable it when contract is implemented
        // const { bondingCurveContract } = props
        
        // try {
        //     const scale = await bondingCurveContract.methods.scale().call()

        //     bondingCurveContract.events.allEvents({
        //         fromBlock: 0,
        //         toBlock: 'latest'
        //     })
        //         .on('data', async (event: any) => {
        //             try {
        //                 if (['TokenBuyDrops', 'TokenSellDrops'].indexOf(event.event) !== -1) {
        //                     await this.handleEvent(event, scale)
        //                 }
        //             } catch (err) {
        //                 throw err
        //             }
        //         })
        //         .on('error', console.error)
        // } catch (error) {
        //     this.setState({ error })
        // }
        const data = [{"y":new BN("0.1497005988023952"),"x":new BN("1573064804000")},{"y":new BN("0.17123287671232876"),"x":new BN("1573064805000")},{"y":new BN("0.18050541516245489"),"x":new BN("1573064805000")},{"y":new BN("0.1865671641791045"),"x":new BN("1573064806000")},{"y":new BN("0.19157088122605362"),"x":new BN("1573064806000")},{"y":new BN("0.1953125"),"x":new BN("1573064807000")},{"y":new BN("0.199203187250996"),"x":new BN("1573064807000")},{"y":new BN("0.20161290322580647"),"x":new BN("1573064808000")},{"y":new BN("0.20408163265306123"),"x":new BN("1573064808000")},{"y":new BN("0.2066115702479339"),"x":new BN("1573064809000")},{"y":new BN("0.20920502092050208"),"x":new BN("1573064810000")},{"y":new BN("0.2109704641350211"),"x":new BN("1573064810000")},{"y":new BN("0.2127659574468085"),"x":new BN("1573064811000")},{"y":new BN("0.2145922746781116"),"x":new BN("1573064811000")},{"y":new BN("0.21551724137931033"),"x":new BN("1573064812000")},{"y":new BN("0.21739130434782608"),"x":new BN("1573064812000")},{"y":new BN("0.21834061135371177"),"x":new BN("1573064813000")},{"y":new BN("0.22026431718061673"),"x":new BN("1573064814000")},{"y":new BN("0.22123893805309736"),"x":new BN("1573064814000")},{"y":new BN("0.2222222222222222"),"x":new BN("1573064815000")},{"y":new BN("0.22321428571428573"),"x":new BN("1573064815000")},{"y":new BN("0.2242152466367713"),"x":new BN("1573064815000")},{"y":new BN("0.22522522522522523"),"x":new BN("1573064816000")},{"y":new BN("0.22624434389140272"),"x":new BN("1573064816000")},{"y":new BN("0.22727272727272727"),"x":new BN("1573064816000")},{"y":new BN("0.228310502283105"),"x":new BN("1573064817000")},{"y":new BN("0.2293577981651376"),"x":new BN("1573064817000")},{"y":new BN("0.2304147465437788"),"x":new BN("1573064817000")},{"y":new BN("0.23148148148148148"),"x":new BN("1573064818000")},{"y":new BN("0.23148148148148148"),"x":new BN("1573064818000")},{"y":new BN("0.23255813953488372"),"x":new BN("1573064818000")},{"y":new BN("0.23364485981308408"),"x":new BN("1573064818000")},{"y":new BN("0.2347417840375587"),"x":new BN("1573064819000")},{"y":new BN("0.2347417840375587"),"x":new BN("1573064819000")},{"y":new BN("0.23584905660377356"),"x":new BN("1573064819000")},{"y":new BN("0.23696682464454977"),"x":new BN("1573064820000")},{"y":new BN("0.23696682464454977"),"x":new BN("1573064821000")},{"y":new BN("0.23809523809523808"),"x":new BN("1573064821000")},{"y":new BN("0.23809523809523808"),"x":new BN("1573064822000")},{"y":new BN("0.23923444976076555"),"x":new BN("1573064822000")},{"y":new BN("0.23923444976076555"),"x":new BN("1573064823000")},{"y":new BN("0.2403846153846154"),"x":new BN("1573064824000")},{"y":new BN("0.2403846153846154"),"x":new BN("1573064825000")},{"y":new BN("0.24154589371980675"),"x":new BN("1573064825000")},{"y":new BN("0.21701371755649856"),"x":new BN("1573064826000")},{"y":new BN("0.25"),"x":new BN("1573064827000")},{"y":new BN("0.2777777777777778"),"x":new BN("1573064828000")},{"y":new BN("0.275"),"x":new BN("1573064828000")}]
        this.setState({ data })
    }

    //TODO: enable it when contract is implemented
    // handleEvent = async (event: any, scale: any) => {
    //     try {
    //         const { web3 } = this.props

    //         const price = event.returnValues._price / scale
    //         const block = await web3.eth.getBlock(event.blockNumber)

    //         const timeMillis = BigInt(block.timestamp.toString()) * BigInt("1000")
    //         const date = moment(timeMillis.toString()).valueOf()

    //         let newMaxValue = this.state.maxValue

    //         if (price > this.state.maxValue) {
    //             newMaxValue = price
    //         }

    //         this.setState((prevState) => ({
    //             data: [
    //                 ...prevState.data,
    //                 {
    //                     y: +price,
    //                     x: date
    //                 }
    //             ],
    //             maxValue: newMaxValue
    //         }))
    //     } catch (err) {
    //         throw err
    //     }
    // }

    setFilter = (filter: string) => {
        let minDomain = 0

        if (filter !== 'MAX') {
            const duration = moment.duration(`P${filter}`)
            minDomain = moment().subtract(duration).valueOf()
        }

        this.setState({
            activeFilter: filter,
            minDomain
        })
    }

    setDetail = (selectedItem?: any) => {
        const detail = selectedItem ? selectedItem:{}
        this.setState({ selectedItem: detail })
    }

    render() {
        const { activeFilter, selectedItem, minDomain, maxValue, data } = this.state
        const { height, tokenSymbol } = this.props

        if (this.state.error) throw this.state.error

        const detail = selectedItem.x ? selectedItem : data.slice(-1)[0]

        localStorage.setItem('timeline_data', JSON.stringify(data))

        return (
            <div>
                <div style={{ minHeight: height }}>
                    <ReactVisTimeline
                        activeFilter={activeFilter}
                        minDomain={minDomain}
                        maxValue={maxValue}
                        height={height}
                        onShowDetail={this.setDetail}
                        data={this.state.data} />
                </div>

                <Footer
                    symbol={tokenSymbol || "OCEAN"}
                    detail={detail ? {
                        title: `${detail.y.toFixed(4)}`,
                        sub: moment(detail.x).format('lll')
                    } : null}
                >
                    <ul className={styles.timeline_filter}>
                        {this.filters.map((filter) => (
                            <li
                                key={filter}
                                className={cn({ active: filter === activeFilter })}
                                onClick={this.setFilter.bind(this, filter)}>
                                {filter}
                            </li>
                        ))}
                    </ul>
                </Footer>
            </div>
        )
    }
}
