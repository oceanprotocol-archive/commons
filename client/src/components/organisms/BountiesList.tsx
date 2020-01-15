import React, { PureComponent } from 'react'
import { User } from '../../context'
import Spinner from '../atoms/Spinner'
import styles from './BountiesList.module.scss'
import moment from 'moment'

import { getBounties } from '../../graphql'

export default class BountiesList extends PureComponent<
    { issuer?: string; },
    { results: any[]; isLoading: boolean }
> {
    public static contextType = User

    public state = { results: [], isLoading: true }

    public componentDidMount() {
        this.queryBounties();
    }

    private queryBounties() {
        getBounties().then((rs) => {
            if(rs) {
                let results = rs.map((e: any) => { return { bounty: e, data: e.ipfsData.payload } })
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
        const { account } = this.context
        const { issuer } = this.props
        const { isLoading, results } = this.state

        const owned = account && issuer ? results.filter((bounty: any) => account === bounty.bounty.issuers[0]):[]
        const data = owned.length > 0 ? owned:results
        return (
            <>
            {owned.length > 0 ? (
                <h2 className={styles.title}>Your Data Challenges</h2>
                ):(
                <h2 className={styles.title}>Data Challenges You Can Contribute</h2>
            )}
            <div className={styles.bountiesContainer}>
                {isLoading ? (
                    <Spinner />
                ) : data.length > 0 ? (
                    <>
                        {data.map((bounty: any) => (
                            <div key={bounty.bounty.id}>
                            {
                                (
                                    <div className={styles.bounty}>
                                        <a href={`./bounty/${bounty.bounty.id}`}>
                                            <div className={styles.leftArea}>
                                                <span className={styles.subTitle}>{bounty.data.title}</span>
                                                {bounty.data.categories.map((cat: string) => (<span className={styles.tag} key={cat}>{cat}</span>))}
                                            </div>
                                            <div className={styles.rightArea}>
                                                <span><b>Reward:</b> {bounty.data.fulfillmentAmount} OCEAN</span>
                                                <span><b>Difficulty:</b> {bounty.data.difficulty}</span>
                                                <span><b>Deadline:</b> {moment(bounty.data.deadline).format('DD/MM/YYYY')}</span>
                                            </div>
                                        </a>
                                    </div>
                                )
                            }
                            </div>
                            ))}
                    </>
                ) : (
                    <div className={styles.empty}>
                        <p>No Bounties Yet.</p>
                    </div>
                )}
            </div>
            </>
        )
    }
}
