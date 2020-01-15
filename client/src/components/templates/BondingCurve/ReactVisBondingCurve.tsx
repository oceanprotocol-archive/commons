import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import { AreaSeries, FlexibleWidthXYPlot, GradientDefs, LineSeries, MarkSeries, VerticalGridLines, XAxis } from 'react-vis'
import styles from './chart.module.scss'

interface ReactVisBondingCurveProps {
    onShowDetail: (value?: any) => void
    height: number
    data: Array<any>
}

interface ReactVisBondingCurveState {
    hoverValues: Array<any>
}

export default class ReactVisBondingCurve extends PureComponent<ReactVisBondingCurveProps, ReactVisBondingCurveState> {
    state = {
        hoverValues: [{} as any]
    }

    // static propTypes = {
    //     onShowDetail: PropTypes.func,
    //     height: PropTypes.number.isRequired,
    //     data: PropTypes.array.isRequired
    // }

    _onMouseLeave = () => {
        const { onShowDetail } = this.props

        this.setState({ hoverValues: [{}] })

        if (onShowDetail) {
            onShowDetail()
        }
    };

    _onNearestX = (value: any) => {
        const { onShowDetail } = this.props

        this.setState({ hoverValues: [value] })

        if (onShowDetail) {
            onShowDetail(value)
        }
    };

    getSupply = (d: any) => d.supply;
    getSell = (d: any) => d.sell;
    getValue = (d: any) => d.value;

    hasValue = (d: any) => !!d.sell;
    tickFormat = (d: any) => numeral(d).format('0 a');

    render() {
        const { hoverValues } = this.state
        const { height, data } = this.props

        return (
            <div className={styles.ocean_chart}>
                <FlexibleWidthXYPlot
                    margin={{ left: 0, right: 0, top: 10, bottom: 40 }}
                    animation
                    onMouseLeave={this._onMouseLeave}
                    getX={this.getSupply}
                    getY={this.getValue}
                    height={height}
                >
                    {/*<GradientDefs>
                        <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#ff4092" stopOpacity={0.8} />
                            <stop offset="70%" stopColor="white" stopOpacity={0} />
                        </linearGradient>
                    </GradientDefs>*/}

                    <AreaSeries
                        color={'url(#oceanGradient)'}
                        getY={this.getSell}
                        getNull={this.hasValue}
                        data={data}
                    />
                    <LineSeries
                        strokeWidth={3}
                        className={styles.ocean_line}
                        style={{ strokeLinejoin: 'round' }}
                        onNearestX={this._onNearestX}
                        data={data}
                    />

                    {/*
                        hoverValues[0].supply && (
                            <XAxis
                                tickTotal={6}
                                tickFormat={this.tickFormat}
                            />
                        )
                    */}
                    <XAxis
                        tickTotal={6}
                        tickFormat={this.tickFormat}
                    />

                    {
                        hoverValues[0].supply && (
                            <VerticalGridLines
                                className={styles.ocean_crosshair_line}
                                tickValues={[hoverValues[0].supply]}
                            />
                        )
                    }

                    {
                        hoverValues[0].supply && (
                            <MarkSeries
                                className={styles.ocean_crosshair_dot}
                                size={4}
                                data={hoverValues}
                            />
                        )
                    }

                </FlexibleWidthXYPlot>
            </div>
        )
    }
}
