import React, { PureComponent } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { AreaSeries, FlexibleWidthXYPlot, GradientDefs, LineSeries, MarkSeries, VerticalGridLines, XAxis } from 'react-vis'
import styles from './TimelineChart.module.scss'

interface ReactVisTimelineProps {
    activeFilter: string
    onShowDetail: (value?: any) => void
    maxValue: number
    minDomain: number
    height: number
    data: Array<any>
}

interface ReactVisTimelineState {
    hoverValues: Array<any>
}

export default class ReactVisTimeline extends PureComponent<ReactVisTimelineProps, ReactVisTimelineState> {
    state = {
        hoverValues: [{} as any]
    }

    // static propTypes = {
    //     onShowDetail: PropTypes.func,
    //     minDomain: PropTypes.number,
    //     height: PropTypes.number.isRequired,
    //     data: PropTypes.array.isRequired
    // }

    _onMouseLeave = () => {
        const { onShowDetail } = this.props

        this.setState({ hoverValues: [{} as any] })

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

    render() {
        const { hoverValues } = this.state
        const { minDomain, height, data } = this.props

        const domain = minDomain ? [minDomain, moment().endOf('day').valueOf()] : null

        return (
            <div className={styles.ocean_chart}>
                <FlexibleWidthXYPlot
                    margin={{ left: 0, right: 0, top: 10, bottom: 40 }}
                    xType="time"
                    animation
                    onMouseLeave={this._onMouseLeave}
                    height={height}
                    xDomain={domain}>

                    <LineSeries
                        strokeWidth={3}
                        className={styles.ocean_line}
                        style={{ strokeLinejoin: 'round' }}
                        onNearestX={this._onNearestX}
                        data={data}
                    />

                    <GradientDefs>
                        <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#ff4092" stopOpacity={0.8} />
                            <stop offset="90%" stopColor="white" stopOpacity={0} />
                        </linearGradient>
                    </GradientDefs>

                    <AreaSeries
                        color={'url(#oceanGradient)'}
                        data={data}
                    />

                    {
                        hoverValues[0].x && (
                            <VerticalGridLines
                                className={styles.ocean_crosshair_line}
                                tickValues={[hoverValues[0].x.toNumber()]}
                            />
                        )
                    }

                    {
                        hoverValues[0].x && (
                            <MarkSeries
                                className={styles.ocean_crosshair_dot}
                                size={4}
                                data={hoverValues}
                            />
                        )
                    }

                    {
                        hoverValues[0].x && (
                            <XAxis
                                tickTotal={6}
                            />
                        )
                    }

                </FlexibleWidthXYPlot>
            </div>
        )
    }
}
