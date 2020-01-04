import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { Logger } from '@oceanprotocol/squid'
import { User } from '../../context'
import Spinner from '../atoms/Spinner'
import AssetTeaser from '../molecules/AssetTeaser'
import styles from './BountiesList.module.scss'

export default class BountiesList extends PureComponent<
    { list?: boolean; recent?: number },
    { results: any[]; isLoading: boolean }
> {
    public static contextType = User

    public state = { results: [{name: 'Bounty 1', categories: 'Categories',  fulfillmentAmount: '10.00', difficulty: 'Hard'}], isLoading: false }

    public componentDidMount() {

    }

    public componentWillUnmount() {

    }


    public render() {
        const { account } = this.context
        const { recent, list } = this.props
        const { isLoading, results } = this.state

        return (
            <div className={styles.bountiesContainer}>
                {isLoading ? (
                    <Spinner />
                ) : results.length ? (
                    <>
                        {results.map((bounty: any) => (
                                <div className={styles.bounty}>
                                    <div className={styles.leftArea}>
                                        <span className={styles.subTitle}>{bounty.name}</span>
                                        <span className={styles.tag}>{bounty.categories}</span>
                                    </div>
                                    <div className={styles.rightArea}>
                                        <span><b>Reward:</b> {bounty.fulfillmentAmount} TOKEN</span>
                                        <span><b>Difficulty:</b> {bounty.difficulty}</span>
                                        <span><b>Deadline:</b></span>
                                    </div>
                                </div>
                            ))}
                    </>
                ) : (
                    <div className={styles.empty}>
                        <p>No Bounties Yet.</p>
                    </div>
                )}
            </div>
        )
    }
}
