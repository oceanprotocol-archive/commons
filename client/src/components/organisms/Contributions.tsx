import React, { PureComponent } from 'react'
import { User } from '../../context'
import Spinner from '../atoms/Spinner'
import styles from './Contributions.module.scss'
import moment from 'moment'

import { getFulfillmentData } from '../../graphql'

export default class Contributions extends PureComponent<
    { fulfillments: any[] },
    { results: any[]; isLoading: boolean }
> {
    public static contextType = User

    public state = { results: [], isLoading: true }

    public componentDidMount() {
        this.queryFulfillments();
    }

    private async queryFulfillments() {
        const { fulfillments } = this.props

        const fetchAllFullfiments = async () => await Promise.all(
            fulfillments.map(
                (fulfillment:any) =>
                    new Promise<any>(async (resolve, reject) =>
                        resolve({
                            ...fulfillment,
                            ipfsData: await getFulfillmentData(fulfillment.id)
                        })
                    )
            )
        );
        const fullfimentsList = await fetchAllFullfiments()
        console.log(fullfimentsList)
        this.setState({ results: fullfimentsList, isLoading: false })

    }

    public componentWillUnmount() {

    }


    public render() {
        const { isLoading, results } = this.state

        return (
            <div className={styles.fulfillmentsContainer}>
                {isLoading ? (
                    <Spinner />
                ) : results.length > 0 ? (
                    <>
                        {results.map((fulfillment: any) => (
                            <div key={fulfillment.id}>
                            {
                                (
                                    <div className={styles.fulfillment}>
                                        <a href={`${fulfillment.ipfsData.payload.sourceDirectoryHash}${fulfillment.ipfsData.payload.sourceFileHash}`} target="_blank">
                                            <div className={styles.leftArea}>
                                                <span className={styles.subTitle}>{fulfillment.ipfsData.payload.description}</span>
                                            </div>
                                            <div className={styles.rightArea}>
                                                <span><b>Fulfillers:</b> {fulfillment.ipfsData.payload.fulfillers}</span>
                                                <span><b>Payout:</b> {fulfillment.ipfsData.payload.payoutAmounts}</span>
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
                        <p>No Fulfillments Yet.</p>
                    </div>
                )}
            </div>
        )
    }
}
