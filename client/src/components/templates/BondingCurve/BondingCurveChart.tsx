import React, { PureComponent } from 'react'
import Web3 from 'web3'
import PropTypes from 'prop-types'
import { BigNumber as BN } from 'bignumber.js'
import numeral from 'numeral'
import { calculateBuyPrice } from '../../../utils/bondingcurveCalculator'
import Footer from './Footer'
import Loader from './Loader'
import ReactVisBondingCurve from './ReactVisBondingCurve'

interface BondingCurveChartProps {
    bondingCurveContract: any
    web3?: Web3 //TODO make it required when contract is implemented
    height: number
}

interface BondingCurvePrice {
    value: number
    supply: number
}

interface BondingCurveChartState {
    params: any
    loading: boolean
    data: Array<any>
    selectedItem: any
    currentPrice: BondingCurvePrice
    error: any
}

export default class BondingCurveChart extends PureComponent<BondingCurveChartProps> {
    // static propTypes = {
    //     bondingCurveContract: PropTypes.object.isRequired,
    //     web3: PropTypes.object.isRequired,
    //     height: PropTypes.number.isRequired
    // }

    state = {
        params: {},
        loading: false,
        data: [],
        selectedItem: {} as any,
        currentPrice: {
            value: 0,
            supply: 0
        },
        error: undefined
    }

    async componentDidMount() {
        const { bondingCurveContract } = this.props

        try {
            this.setState({ loading: true })

            if(bondingCurveContract.methods) {

                const dropsSupply = new BN(await bondingCurveContract.methods.dropsSupply().call())
                const scale = new BN(await bondingCurveContract.methods.scale().call())
                const reserveRatio = new BN(await bondingCurveContract.methods.reserveRatio().call()).div(1000000)
                const poolBalance = new BN(await bondingCurveContract.methods.poolBalance().call()).div(scale)
                const totalSupply = new BN(await bondingCurveContract.methods.totalSupply().call())
                const ndrops = new BN(await bondingCurveContract.methods.ndrops().call())
                const nOcean = new BN(await bondingCurveContract.methods.nOcean().call()).div(scale)
                const ghostSupply = new BN(await bondingCurveContract.methods.ghostSupply().call())

                const params = {
                    dropsSupply,
                    reserveRatio,
                    poolBalance,
                    scale,
                    totalSupply,
                    ghostSupply,
                    nOcean,
                    ndrops,
                    price: poolBalance.div(totalSupply.times(reserveRatio)).toNumber()
                }

                const { data, currentPrice } = this.getChartData(params)

                this.setState({
                    params,
                    data,
                    currentPrice,
                    loading: false
                })
            } else {
                //TODO: set default data for the moment
                const params = {"dropsSupply": new BN("36"),"reserveRatio": new BN("0.9"),"poolBalance":new BN("11"),"scale":new BN("1000000000000000000"),"totalSupply":new BN("136"),"ghostSupply":new BN("10"),"nOcean":new BN("11"),"ndrops":new BN("46"),"price":new BN("0.08986928104575163").toNumber()}
                const { data, currentPrice } = this.getChartData(params)
                
                this.setState({
                    params,
                    data,
                    currentPrice,
                    loading: false
                })

            }
        } catch (error) {
            this.setState({ error })
        }
    }

    // getChartData({ totalSupply, reserveRatio, poolBalance, price: currentPrice }) {
    getChartData(params: any) {
        // TODO - remark - Not sure how much we should display

        /*
          * TODO - remark - Not sure if we need to display buy prices if supply < total supply like https://bondingcurves.relevant.community/
          * If so, we'll need to do something like this. The issue is that when doing this, we can't have a variable supply/pool balance to calculate the price.
          * When using a variable amount like relevant, the calculations didn't seem to be correct for me.
          * https://github.com/relevant-community/bonding-curve-component/blob/ceba574b9eb740715331e3124635b87b06c3790f/src/Chart.js#L31
          */

        const total = 100000

        const step = Math.round(total / 100)
        const amount = new BN(step)

        let _supply = new BN(10)
        let _balance = new BN(1)

        const data = []

        for (let i = step; i < total * 1.5; i += step) {
            const [tokens, price] = calculateBuyPrice({
                totalSupply: _supply,
                amount,
                poolBalance: _balance,
                reserveRatio: params.reserveRatio
            })

            _supply = _supply.plus(tokens)
            _balance = _balance.plus(amount)

            data.push({
                supply: _supply.toNumber(),
                sell: +price.toFixed(4),
                value: +price.toFixed(4)
            })
        }

        return { data, currentPrice: { supply: params.totalSupply, value: params.price } }
    }

    setDetail = (selectedItem?: any) => {
        const detail = selectedItem ? selectedItem:{}
        this.setState({ selectedItem: detail })
    }

    render() {
        const { data, loading, selectedItem, currentPrice, error } = this.state
        const { height } = this.props

        if (error) throw error

        return (
            <div>
                {
                    loading ? (
                        <Loader style={{ minHeight: height }} />
                    ) : (
                        <div style={{ minHeight: height }}>
                            <ReactVisBondingCurve
                                data={data}
                                onShowDetail={this.setDetail}
                                height={200}
                            />
                        </div>
                    )
                }

                <Footer
                    symbol="OCN"
                    detail={{
                        title: `${selectedItem.value ? selectedItem.value : currentPrice.value.toFixed(4)}`,
                        sub: selectedItem.supply ? `Supply: ${numeral(selectedItem.supply).format('0,0')}` : `Total supply: ${numeral(currentPrice.supply).format('0,0')}`
                    }}
                />
            </div>
        )
    }
}
