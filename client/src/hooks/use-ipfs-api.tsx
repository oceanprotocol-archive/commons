/* eslint-disable no-console */

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
            const message = 'Connected to IPFS gateway'
            console.time(message)
            ipfs = await ipfsClient(config)
            console.timeEnd(message)
            ipfsMessage = message

            const version = await ipfs.version()
            ipfsVersion = version.version
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
