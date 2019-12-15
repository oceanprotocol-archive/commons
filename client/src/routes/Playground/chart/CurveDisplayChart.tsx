import React, { Component } from 'react';
import Chart, { Line } from 'react-chartjs-2';
// import * as math_helpers from '../lib/math_helpers';
import 'chartjs-plugin-downsample';

console.log("CHART", Chart)
// Chart.defaults.global.defaultFontSize = 16;
// Chart.defaults.global.elements.point.radius = 0;
// Chart.defaults.global.elements.point.hitRadius = 10;
// Chart.defaults.global.elements.point.hoverRadius = 10;

const Colours = ["green", "orange", "blue", "red"];

interface ICurveDisplayProps {
	stacked?: boolean
	xDataset: Array<any>
	yDatasets: Array<any>
	title: string
	xLabel: string
	yLabel: string

}

class CurveDisplayChart extends Component<ICurveDisplayProps, any> {
	render() {
		const { stacked=false, xDataset, yDatasets, title, xLabel, yLabel } = this.props;

		const chartData = {
			labels: xDataset,
			datasets: this.compileDatasets(stacked, xDataset, yDatasets),
		};

		const chartOptions = {
			maintainAspectRatio: true,
			title: {
					display: true,
					text: title
			},
			tooltips: {
    		callbacks: {
		      title: (items: any, data: any) => `x: ${items[0].xLabel}`,
		      label: (item: any, data:any) => `y: ${item.yLabel}`
		    }
		  },
			scales: {
			 xAxes: [{
				 scaleLabel: {
					 display: true,
					 labelString: xLabel
				 }
			 }],
			 yAxes: [{
				 stacked: stacked,
				 scaleLabel: {
					 display: true,
					 labelString: yLabel
				 }
			 }],
		 },
		 // downsample: {
			//  enabled: true,
			//  threshold: 1000,
		 // },
		};

  	return (
			<Line data={chartData} options={chartOptions} width={1000} height={500} />
		);
	}

	wrapIndex(index: number, arrayLength: number) {
		return (index + arrayLength) % arrayLength
	}

	compileDatasets(stacked: boolean, xDataset: Array<any>, yDatasets: Array<any>) {
		// let arrayDim = math_helpers.getdim(yDatasets);
		// assert(arrayDim && arrayDim[0] >= 1);
		return yDatasets.map((dataSet, index) => {
			return {
				label: dataSet.label,
				borderColor: Colours[this.wrapIndex(index, Colours.length)],
				backgroundColor: stacked ? Colours[this.wrapIndex(index, Colours.length)] : "rgba(0,0,0,0.1)",
				fillColor: "rgba(220,220,220,0.2)",
				strokeColor: "rgba(220,220,220,1)",
				pointColor: "rgba(220,220,220,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(220,220,220,1)",
				data: dataSet.data.map((y: any, i: number) => ({ x: xDataset[i], y: y })),
			}
		});
	}
}

export default CurveDisplayChart;
