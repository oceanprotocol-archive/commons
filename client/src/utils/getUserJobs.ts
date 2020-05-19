import { Account } from '@oceanprotocol/squid'

export async function getUserJobs(ocean: any, account: string) {
    try {
        const account = await ocean.accounts.list()

        await account.authenticate()
        const jobList = await ocean.compute.status(account[0])
        return jobList
    } catch (error) {
        console.error(error)
    }
}
