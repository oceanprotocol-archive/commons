/* eslint-disable no-console */

import { useEffect, useState } from 'react'
import ipfsClient from 'ipfs-http-client'

let ipfs: any = null
let ipfsMessage = ''
let ipfsVersion = ''

interface IpfsConfig {
    host: string
    port: string
    protocol: string
}

export default function useIpfsApi(config: IpfsConfig) {
    const [isIpfsReady, setIpfsReady] = useState(Boolean(ipfs))
    const [ipfsError, setIpfsError] = useState(null)

    useEffect(() => {
        async function initIpfs() {
            if (ipfs !== null) return

            ipfsMessage = 'Checking IPFS gateway...'

            try {
                const message = `Connected to ${config.host}`
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

        initIpfs()
    }, [config])

    useEffect(() => {
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
