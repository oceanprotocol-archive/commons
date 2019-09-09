/* eslint-disable no-console */

import React, { useState } from 'react'
import useIpfsApi from '../../../../hooks/use-ipfs-api'
import Label from '../../../../components/atoms/Form/Label'
import Spinner from '../../../../components/atoms/Spinner'
import Dropzone from '../../../../components/molecules/Dropzone'
import { formatBytes, pingUrl } from './utils'
import { ipfsGatewayUri } from '../../../../config'
import styles from './index.module.scss'

const config = {
    host: 'ipfs.infura.io',
    port: '5001',
    protocol: 'https'
}

export default function Ipfs({ addFile }: { addFile(url: string): void }) {
    const {
        ipfs,
        ipfsVersion,
        isIpfsReady,
        ipfsError,
        ipfsMessage
    } = useIpfsApi(config)

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    async function saveToIpfs(data: Buffer, size: number) {
        const totalSize = formatBytes(size, 0)

        setLoading(true)
        setMessage(`Adding to IPFS<br /><small>0/${totalSize}</small><br />`)

        try {
            const response = await ipfs.add(data, {
                progress: (length: number) =>
                    setMessage(
                        `Adding to IPFS<br />
                        <small>${formatBytes(
                            length,
                            0
                        )}/${totalSize}</small><br />`
                    )
            })

            const cid = response[0].hash
            console.log(`File added: ${cid}`)

            // Ping gateway url to make it globally available,
            // but store native url in DDO.
            const urlGateway = `${ipfsGatewayUri}/ipfs/${cid}`
            const url = `ipfs://${cid}`

            setMessage('Checking IPFS gateway URL')
            await pingUrl(urlGateway)

            // add IPFS url to file.url
            addFile(url)
        } catch (error) {
            console.error(`Adding to IPFS failed: ${error.message}`)
            setLoading(false)
        }
    }

    function handleOnDrop(files: File[]) {
        files.forEach((file: File) => {
            const reader: any = new FileReader()

            reader.readAsArrayBuffer(file)
            reader.onloadend = () => {
                const buffer: any = Buffer.from(reader.result)
                saveToIpfs(buffer, file.size)
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
