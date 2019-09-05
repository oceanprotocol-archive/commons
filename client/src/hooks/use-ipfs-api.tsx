import { useEffect, useState } from 'react'
import ipfsClient from 'ipfs-http-client'

let ipfs: any = null
let ipfsMessage = ''
let ipfsVersion = ''

export default function useIpfsApi(config: {
    host: string
    port: string
    protocol: string
}) {
    const [isIpfsReady, setIpfsReady] = useState(Boolean(ipfs))
    const [ipfsError, setIpfsError] = useState(null)

    async function initIpfs() {
        ipfsMessage = 'Checking IPFS gateway...'

        if (ipfs) return

        try {
            ipfs = await ipfsClient(config)
            const version = await ipfs.version()
            ipfsVersion = version.version
            ipfsMessage = 'Connected to IPFS gateway'
        } catch (error) {
            setIpfsError(error.message)
        }
        setIpfsReady(Boolean(ipfs))
    }

    useEffect(() => {
        initIpfs()

        // just like componentWillUnmount()
        return function cleanup() {
            if (ipfs) {
                setIpfsReady(false)
                ipfs = null
                ipfsMessage = ''
                ipfsVersion = ''
                setIpfsError(null)
            }
        }
    }, [])

    return { ipfs, ipfsVersion, isIpfsReady, ipfsError, ipfsMessage }
}
