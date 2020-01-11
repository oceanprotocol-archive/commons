import React, { PureComponent } from 'react'
import { User } from '../../context'
import Spinner from '../atoms/Spinner'
import styles from './BountiesList.module.scss'
import moment from 'moment'

import { getBounties } from '../../graphql'

export default class BountiesList extends PureComponent<
    { list?: boolean; recent?: number },
    { results: any[]; isLoading: boolean }
> {
    public static contextType = User

    public state = { results: [], isLoading: true }

    public componentDidMount() {
        getBounties().then((rs) => {
            if(rs) {
                let results = rs.map((e: any) => { return { id: e.id, data: e.ipfsData.payload } })
                this.setState({ results, isLoading: false })
            }
        }).catch((err) => {
            console.log('error', err)
            this.setState({ results: [], isLoading: false })
        });
    }

    public componentWillUnmount() {

    }


    public render() {
        const { isLoading, results } = this.state

        return (
            <div className={styles.bountiesContainer}>
                {isLoading ? (
                    <Spinner />
                ) : results.length > 0 ? (
                    <>
                        {results.map((bounty: any) => (
                                <div className={styles.bounty} key={bounty.id}>
                                    <a href={`./bounty/${bounty.id}`}>
                                        <div className={styles.leftArea}>
                                            <span className={styles.subTitle}>{bounty.data.title}</span>
                                            {bounty.data.categories.map((cat: string) => (<span className={styles.tag} key={cat}>{cat}</span>))}
                                        </div>
                                        <div className={styles.rightArea}>
                                            <span><b>Reward:</b> {bounty.data.fulfillmentAmount} TOKEN</span>
                                            <span><b>Difficulty:</b> {bounty.data.difficulty}</span>
                                            <span><b>Deadline:</b> {moment(bounty.data.deadline).format('DD/MM/YYYY')}</span>
                                        </div>
                                    </a>
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
