import React, { PureComponent } from 'react'
import Web3 from 'web3'
import PropTypes from 'prop-types'
import { BigNumber as BN } from 'bignumber.js'
import numeral from 'numeral'
import { calculateBuyPrice, calculateSigmoidBuyPrice } from '../../../utils/bondingcurveCalculator'
import Footer from './Footer'
import Loader from './Loader'
import ReactVisBondingCurve from './ReactVisBondingCurve'
import { BondingCurveTypes, BondingCurveSettings } from './Settings'
import { BondingCurveParams } from './index'

interface BondingCurveChartProps {
    bondingCurveContract: any
    web3?: Web3
    height: number
    tokenSymbol?: string
    curveParams?: BondingCurveParams

}

interface BondingCurvePrice {
    value: number
    supply: BN
}

interface BondingCurveChartState {
    params: any
    loading: boolean
    data: Array<any>
    selectedItem: any
    currentPrice: BondingCurvePrice
    error: any
}

export default class BondingCurveChart extends PureComponent<BondingCurveChartProps, BondingCurveChartState> {
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
            supply: new BN(0)
        },
        error: undefined
    }

    async componentDidMount() {
        const { bondingCurveContract, curveParams } = this.props

        try {
            this.setState({ loading: true })

            if(bondingCurveContract.methods) {

                const dropsSupply = new BN(await bondingCurveContract.methods.dropsSupply().call())
                const scale = new BN(await bondingCurveContract.methods.scale().call())
                const reserveRatio = new BN(await bondingCurveContract.methods.reserveRatio().call()).div(new BN(1000000))
                const poolBalance = new BN(await bondingCurveContract.methods.poolBalance().call()).div(scale)
                const totalSupply = new BN(await bondingCurveContract.methods.totalSupply().call())
                const ndrops = new BN(await bondingCurveContract.methods.ndrops().call())
                const nOcean = new BN(await bondingCurveContract.methods.nOcean().call()).div(scale)
                const ghostSupply = new BN(await bondingCurveContract.methods.ghostSupply().call())

                const params = {
                    // dropsSupply,
                    reserveRatio,
                    // poolBalance,
                    // scale,
                    totalSupply,
                    // ghostSupply,
                    // nOcean,
                    // ndrops,
                    price: poolBalance.div(totalSupply.times(reserveRatio)).toNumber()
                }

                const { data, currentPrice } = this.getChartData(params)

                this.setState({
                //     params,
                    data,
                    currentPrice,
                    loading: false
                })
            } else if (curveParams && curveParams.curveType) {
                let params: any = {}
                // let data: Array<any> = []
                // let currentPrice: BondingCurvePrice = {
                //     value: 0,
                //     supply: new BN(0)
                // } 
                //TODO: set default data for the moment
                console.log('CURVE PARAMS', curveParams)
                switch (curveParams.curveType) {
                    case 'standard':
                        params = {
                            // "dropsSupply": new BN("36"),
                            reserveRatio: curveParams && curveParams.reserveRatio ? curveParams.reserveRatio : new BN("0.9"),
                            // "poolBalance":new BN("11"),
                            // "scale":new BN("1000000000000000000"),
                            totalSupply: curveParams && curveParams.totalSupply ? curveParams.totalSupply : new BN("100000"),
                            // "ghostSupply":new BN("10"),
                            // "nOcean":new BN("11"),
                            // "ndrops":new BN("46"),
                            price: (new BN("0.08986").toNumber())
                        }
                        const rs0 = this.getChartData(params)
                        
                        this.setState({
                            // params,
                            data: rs0.data,
                            currentPrice: rs0.currentPrice,
                            loading: false
                        })
                        break;
                    case 'sigmoid':
                        const curveHeight = (curveParams && curveParams.curveHeight) || new BN(5000)
                        const inflectionSupply = (curveParams && curveParams.inflectionSupply) || new BN(15000)
                        const steepness = (curveParams && curveParams.steepness) || new BN(1000000)
                        params = {
                            "curveHeight": curveHeight,
                            "inflectionSupply": inflectionSupply,
                            "steepness": steepness,
                            "totalSupply": curveParams && curveParams.totalSupply ? curveParams.totalSupply : new BN("100000"),
                            price: (new BN("0.08986").toNumber())
                        }

                        const rs1 = this.getChartData2(params)
                        
                        this.setState({
                        //     params,
                            data: rs1.data,
                            currentPrice: rs1.currentPrice,
                            loading: false
                        })
                        break;
                    default:
                        console.log('NO BONDING CURVE SELECTED')
                        this.setState({ loading: false })
                        break;
                }

            }
        } catch (error) {
            this.setState({ error })
        }
    }

    // getChartData({ totalSupply, reserveRatio, poolBalance, price: currentPrice }) {
    getChartData(params: {reserveRatio: BN, totalSupply: BN, price: number}) {
        // TODO - remark - Not sure how much we should display

        /*
          * TODO - remark - Not sure if we need to display buy prices if supply < total supply like https://bondingcurves.relevant.community/
          * If so, we'll need to do something like this. The issue is that when doing this, we can't have a variable supply/pool balance to calculate the price.
          * When using a variable amount like relevant, the calculations didn't seem to be correct for me.
          * https://github.com/relevant-community/bonding-curve-component/blob/ceba574b9eb740715331e3124635b87b06c3790f/src/Chart.js#L31
          */

        const { curveParams } = this.props;

        const totalSupply = params.totalSupply ? params.totalSupply.toNumber() : 100000
        const step = Math.round(totalSupply / 100)
        const total = totalSupply * 1.5
        const amount = new BN(step)

        const initialReseveBalance = new BN(10)
        let _supply = initialReseveBalance
        let _balance = initialReseveBalance.times(new BN(1).minus(params.reserveRatio))

        const data = []

        // const { calculateBuyPrice } = BondingCurveSettings[(curveParams && curveParams.curveType) || BondingCurveTypes[0]]

        // for (let i = step; i < total * 1.5; i += step) {
        for (let i = step; i < total; i += step) {
            const [tokens, price] = calculateBuyPrice({
                totalSupply: _supply,
                poolBalance: _balance,
                reserveRatio: params.reserveRatio,
                amount
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

    getChartData2(params: {curveHeight: BN, inflectionSupply: BN, steepness: BN, totalSupply: BN, price: number}) {
        // TODO - remark - Not sure how much we should display

        /*
          * TODO - remark - Not sure if we need to display buy prices if supply < total supply like https://bondingcurves.relevant.community/
          * If so, we'll need to do something like this. The issue is that when doing this, we can't have a variable supply/pool balance to calculate the price.
          * When using a variable amount like relevant, the calculations didn't seem to be correct for me.
          * https://github.com/relevant-community/bonding-curve-component/blob/ceba574b9eb740715331e3124635b87b06c3790f/src/Chart.js#L31
          */

        const { curveParams } = this.props;

        // const bondingCurveParams = BondingCurveSettings[(curveParams && curveParams.curveType) || BondingCurveTypes[1]]
        // const { calculateBuyPrice } = bondingCurveParams

        // let { curveHeight, inflectionSupply, steepness } = curveParams || {
        //     curveHeight: bondingCurveParams.curveHeight,
        //     inflectionSupply: bondingCurveParams.inflectionSupply,
        //     steepness: bondingCurveParams.steepness
        // }

        // curveHeight = (curveHeight && new BN(curveHeight)) || new BN(bondingCurveParams.curveHeight)
        // inflectionSupply = (inflectionSupply && new BN(inflectionSupply)) || new BN(bondingCurveParams.inflectionSupply)
        // steepness = (steepness && new BN(steepness)) || new BN(bondingCurveParams.steepness)

        // curveHeight = new BN(curveHeight || 5000)
        // inflectionSupply = new BN(inflectionSupply || 15000)
        // steepness = new BN(steepness || 1000000)


        const totalSupply = params.totalSupply ? params.totalSupply.toNumber() : 100000
        const step = Math.round(totalSupply / 100)
        const total = totalSupply * 1.5
        const amount = new BN(step)

        const initialReseveBalance = new BN(10.0)
        let _supply = initialReseveBalance
        let [_balance] = calculateSigmoidBuyPrice({
        // let [_balance] = calculateBuyPrice({
            curveHeight: params.curveHeight, 
            inflectionSupply: params.inflectionSupply,
            steepness: params.steepness,
            totalSupply: new BN(0),
            amount: _supply
        })
        _balance = new BN(_balance)

        const data = []

        for (let i = step; i < total; i += step) {
            const [tokens, price] = calculateSigmoidBuyPrice({
                curveHeight:params.curveHeight, 
                inflectionSupply: params.inflectionSupply,
                steepness: params.steepness,
                totalSupply: _supply,
                amount
            })

            _supply = _supply.plus(tokens)
            _balance = _balance.plus(amount)

            data.push({
                supply: _supply.toNumber(),
                sell: +price.toFixed(4),
                value: +price.toFixed(4)
            })
        }

        console.log("DATA", data)

        return { data, currentPrice: { supply: params.totalSupply, value: params.price } }
    }

    setDetail = (selectedItem?: any) => {
        const detail = selectedItem ? selectedItem:{}
        this.setState({ selectedItem: detail })
    }

    render() {
        const { data, loading, selectedItem, currentPrice, error } = this.state
        const { height, tokenSymbol } = this.props

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
                    symbol={tokenSymbol || "OCEAN"}
                    detail={{
                        title: `${selectedItem.value ? selectedItem.value : currentPrice.value.toFixed(4)}`,
                        sub: selectedItem.supply ? `Supply: ${numeral(selectedItem.supply).format('0,0')}` : `Total supply: ${numeral(currentPrice.supply).format('0,0')}`
                    }}
                />
            </div>
        )
    }
}
