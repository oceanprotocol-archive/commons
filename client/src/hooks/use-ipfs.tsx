/* eslint-disable no-console */

import Ipfs from 'ipfs'
import { useEffect, useState } from 'react'

let ipfs: any = null
let ipfsMessage = ''
let ipfsVersion = ''

export default function useIpfs() {
    const [isIpfsReady, setIpfsReady] = useState(Boolean(ipfs))
    const [ipfsInitError, setIpfsInitError] = useState(null)

    async function startIpfs() {
        ipfsMessage = 'Starting IPFS...'

        if (ipfs) {
            console.log('IPFS already started')
            // } else if (window.ipfs && window.ipfs.enable) {
            //     console.log('Found window.ipfs')
            //     ipfs = await window.ipfs.enable()
        } else {
            try {
                const message = 'IPFS started'
                console.time(message)

                ipfs = await Ipfs.create()
                console.timeEnd(message)
                ipfsMessage = message

                const { agentVersion } = await ipfs.id()
                ipfsVersion = agentVersion
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

        // just like componentWillUnmount()
        return function cleanup() {
            if (ipfs && ipfs.stop) {
                console.time('IPFS stopped')
                ipfs.stop()
                setIpfsReady(false)
                ipfs = null
                ipfsMessage = ''
                ipfsVersion = ''
                setIpfsInitError(null)
                console.timeEnd('IPFS stopped')
            }
        }
    }, [])

    return { ipfs, ipfsVersion, isIpfsReady, ipfsInitError, ipfsMessage }
}
