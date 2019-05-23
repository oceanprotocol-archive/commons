import React, { Component } from 'react'
import Route from '../components/templates/Route'
import Content from '../components/atoms/Content'
import channels from '../data/channels.json'
import { Link } from 'react-router-dom'

class Channels extends Component {
    public render() {
        return (
            <Route title={channels.title} description={channels.description}>
                <Content>
                    <ul>
                        {channels.items.map(channel => (
                            <li key={channel.title}>
                                <Link to={`/channels/${channel.slug}`}>
                                    {channel.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Content>
            </Route>
        )
    }
}

export default Channels
