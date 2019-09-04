/* eslint-disable no-console */

import React from 'react'
import axios from 'axios'
import useIpfs from '../../../hooks/use-ipfs'
import styles from './Ipfs.module.scss'

async function pingUrl(url: string) {
    try {
        const response = await axios(url)
        if (response.status !== 200) console.error(`Could not find ${url}`)

        console.log(`File found under ${url}`)
        return
    } catch (error) {
        console.error(error.message)
    }
}

export default function Ipfs({ addItem }: { addItem(url: string): void }) {
    const { ipfs, ipfsInitError, ipfsMessage } = useIpfs()

    async function saveToIpfs(buffer: Buffer) {
        try {
            const response = await ipfs.add(buffer)
            const cid = response[0].hash
            console.log(`File added: ${cid}`)

            // ping url to make it globally available
            const url = `https://ipfs.io/ipfs/${cid}`
            await pingUrl(url)

            // add IPFS url to file.url
            addItem(url)
        } catch (error) {
            console.error(error.message)
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
            <input
                type="file"
                onChange={e => handleCaptureFile(e.target.files)}
            />
            {ipfsMessage && <div>{ipfsMessage}</div>}
            {ipfsInitError && <div>{ipfsInitError}</div>}
        </div>
    )
}
