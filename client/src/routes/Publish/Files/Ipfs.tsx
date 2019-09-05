/* eslint-disable no-console */

import React, { useState } from 'react'
import axios from 'axios'
import useIpfs from '../../../hooks/use-ipfs'
import Label from '../../../components/atoms/Form/Label'
import Spinner from '../../../components/atoms/Spinner'
import styles from './Ipfs.module.scss'

async function pingUrl(url: string) {
    try {
        const response = await axios(url)
        if (response.status !== 200) console.error(`Not found: ${url}`)

        console.log(`File found: ${url}`)
        return
    } catch (error) {
        console.error(error.message)
    }
}

function formatBytes(a: number, b: number) {
    if (a === 0) return '0 Bytes'
    const c = 1024
    const d = b || 2
    const e = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const f = Math.floor(Math.log(a) / Math.log(c))

    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + ' ' + e[f]
}

export default function Ipfs({ addFile }: { addFile(url: string): void }) {
    const {
        ipfs,
        ipfsVersion,
        isIpfsReady,
        ipfsInitError,
        ipfsMessage
    } = useIpfs()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    async function saveToIpfs(buffer: Buffer) {
        setLoading(true)
        setMessage('Adding to local IPFS node<br />')

        try {
            const response = await ipfs.add(buffer, {
                progress: (length: number) => {
                    setMessage(
                        `Adding to local IPFS node<br />
                        ${formatBytes(length, 0)}`
                    )
                }
            })

            const cid = response[0].hash
            console.log(`File added: ${cid}`)

            // Ping gateway url to make it globally available.
            // Using gateway.ipfs.io is faster for initial ping,
            // but we store ipfs.io url in DDO.
            // https://ipfs.github.io/public-gateway-checker/
            const url = `https://ipfs.io/ipfs/${cid}`
            const urlGateway = `https://gateway.ipfs.io/ipfs/${cid}`

            setMessage('Checking IPFS gateway URL')
            await pingUrl(urlGateway)

            // add IPFS url to file.url
            addFile(url)
        } catch (error) {
            console.error(error.message)
            setLoading(false)
        }
    }

    function handleCaptureFile(files: FileList | null) {
        const reader: any = new window.FileReader()
        const file = files && files[0]

        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
            const buffer: any = Buffer.from(reader.result)
            saveToIpfs(buffer)
        }
    }

    return (
        <div className={styles.ipfsForm}>
            <Label htmlFor="fileUpload" required>
                Add File To IPFS
            </Label>
            {loading ? (
                <Spinner message={message} />
            ) : (
                <input
                    type="file"
                    name="fileUpload"
                    id="fileUpload"
                    onChange={e => handleCaptureFile(e.target.files)}
                    disabled={!isIpfsReady}
                />
            )}
            {ipfsMessage !== '' && (
                <div className={styles.message} title={ipfsVersion}>
                    {ipfsMessage}
                </div>
            )}
            {ipfsInitError && (
                <div className={styles.error}>{ipfsInitError}</div>
            )}
        </div>
    )
}
