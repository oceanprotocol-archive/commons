import React, { Component } from 'react'
import Route from '../../components/templates/Route'
import AreaButton from '../../components/atoms/AreaButton'
import { User } from '../../context'
import Loader from './loader'
import styles from './index.module.scss'

interface PublishState {
    type: string
}

class Publish extends Component<{}, PublishState> {
    public state = {
        type: 'start'
    }
    public publishDataset = () => {
        this.setState({ type: 'dataset' })
    }
    public publishContainer = () => {
        this.setState({ type: 'container' })
    }
    public publishWorkflow = () => {
        this.setState({ type: 'workflow' })
    }
    public publishAlgorithm = () => {
        this.setState({ type: 'algorithm' })
    }
    public toSelect = () => {
        this.setState({ type: 'start' })
    }
    public render() {
        return (
            <div>
                {this.state.type !== 'start' && (
                    <Loader loadType={this.state.type} toSelect={this.toSelect}/>
                )}
                {this.state.type === 'start' && (
                    <Route
                        title="Publish"
                        description="What do you want to publish?"
                    >
                        <div className={styles.typeGrid}>
                            <AreaButton title={'Dataset'} description={'Datasets are xxx'} action={this.publishDataset}/>
                            <AreaButton title={'Container'} description={'Container are xxx'} action={this.publishContainer}/>
                            <AreaButton title={'Workflow'} description={'Workflow are xxx'} action={this.publishWorkflow}/>
                            <AreaButton title={'Algorithm'} description={'Algorithm are xxx'} action={this.publishAlgorithm}/>
                        </div>
                    </Route>
                )}
            </div>
        )
    }
}

Publish.contextType = User
export default Publish
