import React, { useEffect, useState } from 'react'
import { getUserJobs } from '../../utils/getUserJobs'
import { User } from '../../context';
import Spinner from '../atoms/Spinner'
import JobTeaser from '../molecules/JobTeaser';



export default function JobsUser() {
    const { ocean, account } = React.useContext(User);
    const [jobList, setJobList] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        async function getJobs() {
            const userJobs = await getUserJobs(ocean, account)
            setJobList(userJobs as any)
            setIsLoading(false)
        }
        getJobs()
    }, [account,ocean])


    return (
        <>
            {isLoading ?
                <Spinner />
                : jobList.length ?
                    jobList.map((job: any) => 
                        (
                            <JobTeaser key={job.jobId} job={job} />
                           
                        )
                    ) : ''
            }
    </>
                )

}