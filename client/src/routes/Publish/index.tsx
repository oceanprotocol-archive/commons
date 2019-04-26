import React, { Component } from 'react'
import Route from '../../components/templates/Route'
import { User } from '../../context'
import Loader from './loader'

interface PublishState {
    type: string
}

class Publish extends Component<{}, PublishState> {
    public state = {
        type: 'start'
    }
    publishDataset = () => {
        this.setState({ type: 'dataset' })
    }
    publishContainer = () => {
        this.setState({ type: 'container' })
    }
    publishAlgorithm = () => {
        this.setState({ type: 'algorithm' })
    }
    publishWorkflow = () => {
        this.setState({ type: 'workflow' })
    }
    public render() {
        return (
            <div>
                {this.state.type !== 'start' && (
                    <Loader loadType={this.state.type}/>
                )}
                {this.state.type === 'start' && (
                    <Route
                        title="Publish"
                        description="What do you want to publish?"
                    >
                        <button onClick={this.publishDataset}>Dataset</button>
                        <button onClick={this.publishContainer}>Container</button>
                        <button onClick={this.publishWorkflow}>Workflow</button>
                        <button onClick={this.publishAlgorithm}>Algorithm</button>
                    </Route>
                )}
            </div>
        )
    }
}

Publish.contextType = User
export default Publish
