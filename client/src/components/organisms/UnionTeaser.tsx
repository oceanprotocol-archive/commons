import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { User } from '../../context'
import { Logger } from '@oceanprotocol/squid'
import styles from './UnionTeaser.module.scss'
import CategoryImage from '../atoms/CategoryImage'
import Fade from 'react-reveal/Fade';
import { IUnion } from '../../box'

interface UnionTeaserProps {
    union: IUnion
}

interface UnionTeaserState {
    unionAssets?: any[]
    isLoading?: boolean
}

export default class UnionTeaser extends Component<
    UnionTeaserProps,
    UnionTeaserState
> {
    public static contextType = User

    public state = {
        unionAssets: [],
        isLoading: true
    }

    public async componentDidMount() {
        // this.getChannelAssets()
    }

    private getChannelAssets = async () => {
        const { ocean } = this.context
        const { union } = this.props

        if (union.alternateName) {

            const searchQuery = {
                offset: 2,
                page: 1,
                query: {
                    tags: [union.alternateName.value]
                },
                sort: {
                    created: -1
                }
            }

            try {
                const search = await ocean.assets.query(searchQuery)
                this.setState({
                    unionAssets: search.results,
                    isLoading: false
                })
            } catch (error) {
                Logger.error(error.message)
                this.setState({ isLoading: false })
            }
        } else {
            this.setState({ isLoading: false })
        }
    }


    public render() {
        const { union } = this.props
        return (
            <Fade>
                <div className={styles.channel}>
                    <header className={styles.channelHeader}>
                        <Link to={`/unions?address=${union.identifier.value}`}>
                            <h2 className={styles.channelTitle}>{union.legalName.value}</h2>
                            <CategoryImage category={''} />
                            <p className={styles.channelTeaser}>{union.slogan ? union.slogan.value:''}</p>
                            <span>Browse Data Assets →</span>
                        </Link>
                    </header>
                </div>
            </Fade>
        )
    }
}
