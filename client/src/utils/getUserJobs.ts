const tempList =
    [{
        "agreementId": "a40d4fbddf7c45fb988b3f47e7fb8d50386ee8c968c94a0db6909cd96582e6cd",
        "algorithmLogUrl": null,
        "dateCreated": 1585581794.73346,
        "dateFinished": null,
        "jobId": "5e67cdffc2224907b10cdb80820033ee",
        "owner": "0x4D156A2ef69ffdDC55838176C6712C90f60a2285",
        "removed": 0,
        "resultsDid": "",
        "resultsUrl": "",
        "status": 10,
        "statusText": "Job started",
        "stopreq": 0
    },
    {
        "agreementId": "a40d4fbdd434c45fb988b3f47e7fb8d50386ee8c968c94a0db6909cd96582e6cd",
        "algorithmLogUrl": null,
        "dateCreated": 1585581794.73346,
        "dateFinished": null,
        "jobId": "5e67cdffc2224907b10cdb80820033ee",
        "owner": "0x4D156A2ef69ffdDC55838176C6712C90f60a2285",
        "removed": 0,
        "resultsDid": "",
        "resultsUrl": "",
        "status": 10,
        "statusText": "Job started",
        "stopreq": 0
    }
    ]



export async function getUserJobs(ocean: any, account: string) {
    try {
        const accounts = await ocean.accounts.list()
        //const jobList = await ocean.compute.status(account)
       // const jobList = await ocean.compute.status(accounts[0])



        return tempList;


    } catch (error) {
        console.error(error.message)
    }

}