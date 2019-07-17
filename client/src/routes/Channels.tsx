import React, { Component } from 'react'
import Route from '../components/templates/Route'
import Content from '../components/atoms/Content'
import channels from '../data/channels.json'
import ChannelTeaser from '../components/organisms/ChannelTeaser'
import withTracker from '../hoc/withTracker'

class Channels extends Component {
    public render() {
        return (
            <Route title={channels.title} description={channels.description}>
                <Content wide>
                    {channels.items.map(channel => (
                        <ChannelTeaser
                            key={channel.title}
                            channel={channel.tag}
                        />
                    ))}
                </Content>
            </Route>
        )
    }
}

export default withTracker(Channels)
