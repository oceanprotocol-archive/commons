import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { User } from '../../context'
import { Logger } from '@oceanprotocol/squid'
import Spinner from '../atoms/Spinner'
import AssetTeaser from '../molecules/AssetTeaser'
import styles from './ChannelTeaser.module.scss'
import channels from '../../data/channels.json'
import CategoryImage from '../atoms/CategoryImage'

interface ChannelTeaserProps {
    channel: string
}

interface ChannelTeaserState {
    channelAssets?: any[]
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
            offset: 4,
            page: 1,
            query: {
                tags: [this.channel.tag],
                price: [-1, 1]
            },
            sort: {
                datePublished: 1
            }
        }

        try {
            const search = await ocean.aquarius.queryMetadata(searchQuery)
            this.setState({
                // TODO: remove hacky way of getting the latest 2 assets
                channelAssets: search.results.splice(2, 2, ''),
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
                    {isLoadingChannel ? (
                        <Spinner message="Loading..." />
                    ) : channelAssets && channelAssets.length ? (
                        <div className={styles.channelResults}>
                            {channelAssets.map((asset: any) => (
                                <AssetTeaser key={asset.id} asset={asset} />
                            ))}
                        </div>
                    ) : (
                        <div>No data sets found.</div>
                    )}
                </div>
            </div>
        )
    }
}
