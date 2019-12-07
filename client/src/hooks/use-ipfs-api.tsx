/* eslint-disable no-console */

import { useEffect, useState } from 'react'
import ipfsClient from 'ipfs-http-client'

let ipfs: any = null
let ipfsMessage = ''
let ipfsVersion = ''

export interface IpfsConfig {
    protocol: string
    host: string
    port: string
}

export default function useIpfsApi(config: IpfsConfig) {
    const [isIpfsReady, setIpfsReady] = useState(Boolean(ipfs))
    const [ipfsError, setIpfsError] = useState('')

    useEffect(() => {
        async function initIpfs() {
            if (ipfs !== null) return

            ipfsMessage = 'Checking IPFS gateway...'

            try {
                // eslint-disable-next-line require-atomic-updates
                ipfs = await ipfsClient(config)
                const version = await ipfs.version()
                ipfsVersion = version.version
                ipfsMessage = `Connected to ${config.host}`
            } catch (error) {
                setIpfsError(`IPFS connection error: ${error.message}`)
            }
            setIpfsReady(Boolean(await ipfs.id()))
        }

        initIpfs()
    }, [config])

    useEffect(() => {
        return function cleanup() {
            if (ipfs) {
                setIpfsReady(false)
                ipfs = null
                ipfsMessage = ''
                ipfsVersion = ''
                setIpfsError('')
            }
        }
    }, [])

    return { ipfs, ipfsVersion, isIpfsReady, ipfsError, ipfsMessage }
}
