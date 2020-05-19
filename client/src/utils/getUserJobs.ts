import { Account } from '@oceanprotocol/squid'

export async function getUserJobs(ocean: any, account: string) {
    try {
        const accounts = await ocean.accounts.list()
        const account=accounts[0]

        await account.authenticate()
        const jobList = await ocean.compute.status(account)
        return jobList
    } catch (error) {
        console.error(error)
    }
}
