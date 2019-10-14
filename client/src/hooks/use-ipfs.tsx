/* eslint-disable no-console */

import Ipfs from 'ipfs'
import { useEffect, useState } from 'react'
import os from 'os'
import shortid from 'shortid'

let ipfs: any = null
let ipfsMessage = ''
let ipfsVersion = ''

export default function useIpfs() {
    const [isIpfsReady, setIpfsReady] = useState(Boolean(ipfs))
    const [ipfsError, setIpfsError] = useState('')

    useEffect(() => {
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

                    ipfs = await Ipfs.create({
                        repo: `${os.homedir()}/.jsipfs-${shortid.generate()}`,
                        config: {
                            Addresses: {
                                // 0 for port so system just assigns a new free port
                                // to allow multiple nodes running at same time
                                Swarm: ['/ip4/0.0.0.0/tcp/0']
                            }
                        }
                    })
                    console.timeEnd(message)
                    ipfsMessage = message

                    const { agentVersion } = await ipfs.id()
                    ipfsVersion = agentVersion
                } catch (error) {
                    const message = `IPFS init error: ${error.message}`
                    ipfsMessage = message
                    console.error(message)
                    ipfs = null
                    setIpfsError(error.message)
                }
            }
            setIpfsReady(Boolean(ipfs))
        }

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
                setIpfsError('')
                console.timeEnd('IPFS stopped')
            }
        }
    }, [])

    return { ipfs, ipfsVersion, isIpfsReady, ipfsError, ipfsMessage }
}
