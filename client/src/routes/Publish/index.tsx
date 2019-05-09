import React, { Component } from 'react'
import Route from '../../components/templates/Route'
import AreaButton from '../../components/atoms/AreaButton'
import { User } from '../../context'
import Loader from './loader'
import styles from './index.module.scss'

import Container from './container.png';
import Dataset from './dataset.png';
import Script from './script.png';
import Workflow from './workflow.png';

interface PublishState {
    type: string
}

class Publish extends Component<{}, PublishState> {
    public state = {
        type: 'start'
    }
    public publishType = (type: string) => {
        this.setState({ type })
    }
    public toSelect = () => {
        this.publishType('start')
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
                            <AreaButton
                                title={'Dataset'}
                                description={'Tabular, image, and other formatted data across various domains.'}
                                action={() => this.publishType('dataset')}
                                image={Dataset}
                            />
                            <AreaButton
                                title={'Container'}
                                description={'A pre-defined computation environment specifying libraries and resources.'}
                                action={() => this.publishType('container')}
                                image={Container}
                            />
                            <AreaButton
                                title={'Workflow'}
                                description={'A directed composite of dataset, container, and script assets.'}
                                action={() => this.publishType('workflow')}
                                image={Workflow}
                            />
                            <AreaButton
                                title={'Script'}
                                description={'A single programming script or notebook to execute a data science task.'}
                                action={() => this.publishType('script')}
                                image={Script}
                            />
                        </div>
                    </Route>
                )}
            </div>
        )
    }
}

Publish.contextType = User
export default Publish
