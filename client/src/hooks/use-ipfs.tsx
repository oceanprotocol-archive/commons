/* eslint-disable no-console */

import Ipfs from 'ipfs'
import { useEffect, useState } from 'react'

let ipfs: any = null
let ipfsMessage: string | null = null

export default function useIpfs() {
    const [isIpfsReady, setIpfsReady] = useState(Boolean(ipfs))
    const [ipfsInitError, setIpfsInitError] = useState(null)

    async function startIpfs() {
        if (ipfs) {
            console.log('IPFS already started')
            // } else if (window.ipfs && window.ipfs.enable) {
            //     console.log('Found window.ipfs')
            //     ipfs = await window.ipfs.enable()
        } else {
            try {
                const message = 'IPFS Started'
                console.time(message)
                ipfs = await Ipfs.create()
                console.timeEnd(message)
                ipfsMessage = message
            } catch (error) {
                const message = `IPFS init error: ${error.message}`
                ipfsMessage = message
                console.error(message)
                ipfs = null
                setIpfsInitError(error)
            }
        }
        setIpfsReady(Boolean(ipfs))
    }

    useEffect(() => {
        startIpfs()

        // just like componentDidUnmount()
        return function cleanup() {
            if (ipfs && ipfs.stop) {
                console.time('IPFS Stopped')
                ipfs.stop()
                setIpfsReady(false)
                ipfs = null
                ipfsMessage = null
                console.timeEnd('IPFS Stopped')
            }
        }
    }, [])

    return { ipfs, isIpfsReady, ipfsInitError, ipfsMessage }
}
