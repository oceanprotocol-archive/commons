import React, { Component } from 'react'
import * as math from 'mathjs';
import Route from '../../components/templates/Route'
import Content from '../../components/atoms/Content'
import CurveDisplayChart from './chart/CurveDisplayChart';
// import Button from '../components/atoms/Button'
// import Form from '../components/atoms/Form/Form'
// import Input from '../components/atoms/Form/Input'
// import { User } from '../context'
// import withTracker from '../hoc/withTracker'

interface IPlaygroundState {
    bondingCurveType: string
    bondingCurve: {
        x: any
        y: any
    }
}

interface IPlaygroundProps {

}

class Playground extends Component<IPlaygroundProps, IPlaygroundState> {

    // public static contextType = User

    state: IPlaygroundState = {
        bondingCurveType: '',
        bondingCurve: { x: [], y: [] }
    }

    constructor(props: IPlaygroundProps) {
        super(props);
    }

    componentDidMount() {
        const expr = math.compile('x^(1/3)');
        const maxTokens = 5000;
        // const interval = (curveParameters.maxTokens > 9999) ? curveParameters.maxTokens / 5000 : 1;
        const interval = 1;
        const dataset = math.range(0, maxTokens, interval)
            // .toArray()
            .map((x) => { return {
                x: x,
                y: expr.evaluate({ x: x })}
            });

        console.log('dataset==>', dataset)

        this.setState({
            bondingCurveType: '',
            bondingCurve: {
                x: dataset.map(point => point.x).toArray(),
                y: dataset.map(point => point.y).toArray()

            }
        });
    }

    public render() {

        const { bondingCurve } = this.state;

        return (
            <Route title="Economics Playground" description="This is a playground to experiment with different Bonding Curve settings">
                <Content wide>
                    <CurveDisplayChart title="" xLabel="Token supply" yLabel="Price"
                     yDatasets={[
                         { label: "Bonding", data: bondingCurve.y },
                     ]}
                     xDataset={bondingCurve.x} />
                    
                </Content>
            </Route>
        )
    }
}

// export default withTracker(Playground)
export default Playground
