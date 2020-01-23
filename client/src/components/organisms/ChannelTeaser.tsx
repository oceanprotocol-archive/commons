import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { User } from '../../context'
import { Logger, DDO } from '@oceanprotocol/squid'
import CategoryImage from '../atoms/CategoryImage'
import SearchResults from '../molecules/SearchResults'
import styles from './ChannelTeaser.module.scss'
import channels from '../../data/channels.json'

interface ChannelTeaserProps {
    channel: string
}

interface ChannelTeaserState {
    channelAssets?: DDO[]
    isLoadingChannel?: boolean
}

export default class ChannelTeaser extends Component<
    ChannelTeaserProps,
    ChannelTeaserState
> {
    public static contextType = User

    // Get channel content
    public channel = channels.items
        .filter(({ tag }) => tag === this.props.channel)
        .map(channel => channel)[0]

    public state = {
        channelAssets: [],
        isLoadingChannel: true
    }

    public async componentDidMount() {
        this.getChannelAssets()
    }

    private getChannelAssets = async () => {
        const { ocean } = this.context

        const searchQuery = {
            offset: 2,
            page: 1,
            query: {
                tags: [this.channel.tag]
            },
            sort: {
                created: -1
            }
        }

        try {
            const search = await ocean.assets.query(searchQuery)
            this.setState({
                channelAssets: search.results,
                isLoadingChannel: false
            })
        } catch (error) {
            Logger.error(error.message)
            this.setState({ isLoadingChannel: false })
        }
    }

    public render() {
        const { channelAssets, isLoadingChannel } = this.state
        const { title, tag, teaser } = this.channel

        return (
            <div className={styles.channel}>
                <div>
                    <header className={styles.channelHeader}>
                        <Link to={`/channels/${tag}`}>
                            <h2 className={styles.channelTitle}>{title}</h2>
                            <CategoryImage category={title} />

                            <p className={styles.channelTeaser}>{teaser}</p>
                            <p>Browse the channel →</p>
                        </Link>
                    </header>
                </div>
                <div>
                    <SearchResults
                        isLoading={isLoadingChannel}
                        results={channelAssets}
                        simpleGrid
                    />
                </div>
            </div>
        )
    }
}
