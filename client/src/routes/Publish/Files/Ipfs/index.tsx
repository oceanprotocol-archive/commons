/* eslint-disable no-console */
import React, { useState, useEffect } from 'react'
import useIpfsApi, { IpfsConfig } from '../../../../hooks/use-ipfs-api'
import Spinner from '../../../../components/atoms/Spinner'
import Dropzone from '../../../../components/molecules/Dropzone'
import { formatBytes, pingUrl, streamFiles } from '../../../../utils/utils'
import { ipfsGatewayUri, ipfsNodeUri } from '../../../../config'
import Form from './Form'

export default function Ipfs({ addFile }: { addFile(url: string): void }) {
    const { hostname, port, protocol } = new URL(ipfsNodeUri)

    const ipfsConfig: IpfsConfig = {
        protocol: protocol.replace(':', ''),
        host: hostname,
        port: port || '443'
    }

    const { ipfs, isIpfsReady, ipfsError, ipfsMessage } = useIpfsApi(ipfsConfig)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [fileSize, setFileSize] = useState('')
    const [fileSizeReceived] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        setMessage(
            `Adding to IPFS<br />
             <small>${fileSizeReceived || 0}/${fileSize}</small><br />`
        )
    }, [fileSize, fileSizeReceived])

    async function addToIpfs(data: any) {
        try {
            const cid = await streamFiles(ipfs, data)
            console.log(`File added: ${cid}`)
            return cid
        } catch (error) {
            setError(`Adding to IPFS failed: ${error.message}`)
            setLoading(false)
        }
    }

    async function handleOnDrop(acceptedFiles: any) {
        if (!acceptedFiles[0]) return

        setLoading(true)
        setError('')

        const file = acceptedFiles[0]
        const { path, size } = file
        const totalSize = formatBytes(size, 0)
        setFileSize(totalSize)

        // Add file to IPFS node
        const fileDetails = { path, content: file }

        const cid = await addToIpfs(fileDetails)
        if (!cid) return

        // Ping gateway url to make it globally available,
        // but store native url in DDO.
        const urlGateway = `${ipfsGatewayUri}/ipfs/${cid}/${path}`
        const url = `ipfs://${cid}/${path}`

        setMessage('Checking IPFS gateway URL')

        const isAvailable = await pingUrl(urlGateway)
        // add IPFS url to file.url
        isAvailable && addFile(url)
    }

    return (
        <Form
            error={error}
            ipfsMessage={ipfsMessage}
            ipfsError={ipfsError}
            isIpfsReady={isIpfsReady}
        >
            {loading ? (
                <Spinner message={message} />
            ) : (
                <Dropzone
                    multiple={false}
                    handleOnDrop={handleOnDrop}
                    disabled={!isIpfsReady}
                />
            )}
        </Form>
    )
}
