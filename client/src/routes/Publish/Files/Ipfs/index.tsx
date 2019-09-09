/* eslint-disable no-console */

import React, { useState } from 'react'
import useIpfsApi from '../../../../hooks/use-ipfs-api'
import Label from '../../../../components/atoms/Form/Label'
import Spinner from '../../../../components/atoms/Spinner'
import Dropzone from '../../../../components/molecules/Dropzone'
import { formatBytes, pingUrl } from './utils'
import styles from './index.module.scss'

export default function Ipfs({ addFile }: { addFile(url: string): void }) {
    const config = {
        host: 'ipfs.infura.io',
        port: '5001',
        protocol: 'https'
    }

    const {
        ipfs,
        ipfsVersion,
        isIpfsReady,
        ipfsError,
        ipfsMessage
    } = useIpfsApi(config)

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    async function saveToIpfs(buffer: Buffer) {
        setLoading(true)
        setMessage('Adding to remote IPFS node<br />')

        try {
            const response = await ipfs.add(buffer, {
                progress: (length: number) =>
                    setMessage(
                        `Adding to remote IPFS node<br />
                        ${formatBytes(length, 0)}`
                    )
            })

            const cid = response[0].hash
            console.log(`File added: ${cid}`)

            // Ping gateway url to make it globally available,
            // but store ipfs.io url in DDO.
            // https://ipfs.github.io/public-gateway-checker/
            const url = `https://ipfs.io/ipfs/${cid}`
            const urlGateway = `https://ipfs.infura.io/ipfs/${cid}`

            setMessage('Checking IPFS gateway URL')
            await pingUrl(urlGateway)

            // add IPFS url to file.url
            addFile(url)
        } catch (error) {
            console.error(error.message)
            setLoading(false)
        }
    }

    function handleOnDrop(files: any) {
        const reader: any = new FileReader()

        files &&
            files.forEach((file: File) => {
                reader.readAsArrayBuffer(file)
                reader.onloadend = () => {
                    const buffer: any = Buffer.from(reader.result)
                    saveToIpfs(buffer)
                }
            })
    }

    return (
        <div className={styles.ipfsForm}>
            <Label htmlFor="fileUpload" required>
                Add File To IPFS
            </Label>
            {loading ? (
                <Spinner message={message} />
            ) : (
                <Dropzone handleOnDrop={handleOnDrop} disabled={!isIpfsReady} />
            )}
            {ipfsMessage !== '' && (
                <div className={styles.message} title={ipfsVersion}>
                    {ipfsMessage}
                </div>
            )}
            {ipfsError && <div className={styles.error}>{ipfsError}</div>}
        </div>
    )
}
