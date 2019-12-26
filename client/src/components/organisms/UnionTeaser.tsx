import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { User } from '../../context'
import { Logger } from '@oceanprotocol/squid'
// import Spinner from '../atoms/Spinner'
// import AssetTeaser from '../molecules/AssetTeaser'
import styles from './UnionTeaser.module.scss'
import channels from '../../data/channels.json'
import CategoryImage from '../atoms/CategoryImage'
import Fade from 'react-reveal/Fade';

interface UnionTeaserProps {
    channel: string
}

interface UnionTeaserState {
    channelAssets?: any[]
    isLoadingChannel?: boolean
}

export default class UnionTeaser extends Component<
    UnionTeaserProps,
    UnionTeaserState
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
        // this.getChannelAssets()
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
        const { title, tag, teaser } = this.channel

        return (
            <Fade>
                <div className={styles.channel}>
                    <header className={styles.channelHeader}>
                        <Link to={`/channels/${tag}`}>
                            <h2 className={styles.channelTitle}>{title}</h2>
                            <CategoryImage category={title} />
                            <p className={styles.channelTeaser}>{teaser}</p>
                            <span>Browse the channel →</span>
                        </Link>
                    </header>
                </div>
            </Fade>
        )
    }
}
