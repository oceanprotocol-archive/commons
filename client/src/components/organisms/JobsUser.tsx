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
            console.log(account)
            const userJobs = await getUserJobs(ocean, account)
            console.log('user jobs', userJobs)
            setJobList(userJobs as any)
            setIsLoading(false)
        }
        getJobs()
    }, [account])


    return (
        <>
            {isLoading ?
                <Spinner />
                : jobList.length ?
                    jobList.map((job: any) => 
                        (
                            <JobTeaser key={job.agreementId} />
                           
                        )
                    ) : ''
            }
    </>
                )

}