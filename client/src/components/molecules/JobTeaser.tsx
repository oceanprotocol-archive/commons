import React, { useEffect, useState, useContext } from 'react'
import { User } from '../../context';
import moment from 'moment';
import styles from './JobTeaser.module.scss'


export default function JobTeaser({ job }: { job: any }) {
    const { ocean } = useContext(User);
    const [assetName, setAssetName] = useState()
    useEffect(() => {
        async function getAsset() {
            try {
                const { did } = await (ocean as any).keeper.agreementStoreManager.getAgreement(job.agreementId)
                const asset = await (ocean as any).assets.resolve(did)
                const { attributes } = asset.findServiceByType('metadata')
                const { main } = attributes
                setAssetName(main.name)
             

            } catch (error) {
                console.log(error)
            }
        }

        getAsset()
    }, [ocean,job.agreementId])

    return (
        <article className={styles.assetList}>
            <div className={styles.listRow}>
                <h1>{assetName}</h1>
                <div
                    className={styles.date}
                    title={`Created on ${job.dateCreated}`}
                >
                    {moment.unix(job.dateCreated).fromNow()}
                </div>
            </div>
            <div className={styles.listRow}>
            <div>Job status</div>
            <div>{job.statusText}</div>
            </div>
            <div>{job.resultsUrl}</div>
        </article>
    )
}