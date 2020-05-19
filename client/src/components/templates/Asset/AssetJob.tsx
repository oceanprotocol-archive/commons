import React, { ChangeEvent, useState } from 'react'
import { DDO } from '@oceanprotocol/squid'
import Input from '../../atoms/Form/Input'
import computeOptions from '../../../data/computeOptions.json'
import styles from './AssetJob.module.scss'
import Spinner from '../../atoms/Spinner'
import Button from '../../atoms/Button'
import { messages } from './AssetFile'
import ReactDropzone from 'react-dropzone'
import { readFileContent } from '../../../utils/utils'

interface JobsProps {
    ocean: any
    ddo: DDO
}

const rawAlgorithmMeta = {
    rawcode: `console.log('Hello world'!)`,
    format: 'docker-image',
    version: '0.1',
    container: {}
}

export default function AssetsJobs({ ddo, ocean }: JobsProps) {
    const [isJobStarting, setIsJobStarting] = useState(false)
    const [step, setStep] = useState(99)
    const [error, setError] = useState('')

    const [computeType, setComputeType] = useState('')
    const [computeValue, setComputeValue] = useState({})
    const [algorithmRawCode, setAlgorithmRawCode] = useState('')
    const [isPublished, setIsPublished] = useState(false)
    const [file, setFile] = useState(null)

    const onDrop = async (files: any) => {
        setFile(files[0])
        const fileText = await readFileContent(files[0])
        setAlgorithmRawCode(fileText)
    }

    const handleSelectChange = (event: ChangeEvent<HTMLInputElement>) => {
        const comType = event.target.value
        setComputeType(comType)

        const selectedComputeOption = computeOptions.find(
            (x) => x.name === comType
        )
        if (selectedComputeOption !== undefined)
            setComputeValue(selectedComputeOption.value)
    }

    const startJob = async () => {
        try {
            setIsJobStarting(true)
            setIsPublished(false)
            setError('')
            const accounts = await ocean.accounts.list()
            const ComputeOutput = {
                publishAlgorithmLog: false,
                publishOutput: false,
                brizoAddress: ocean.config.brizoAddress,
                brizoUri: ocean.config.brizoUri,
                metadataUri: ocean.config.aquariusUri,
                nodeUri: ocean.config.nodeUri,
                owner: accounts[0].getId(),
                secretStoreUri: ocean.config.secretStoreUri
            }

            const agreement = await ocean.compute
                .order(accounts[0], ddo.id)
                .next((step: number) => setStep(step))

            rawAlgorithmMeta.container = computeValue
            rawAlgorithmMeta.rawcode = algorithmRawCode

            await ocean.compute.start(
                accounts[0],
                agreement,
                undefined,
                rawAlgorithmMeta,
                ComputeOutput
            )
            setIsPublished(true)
            setFile(null)
        } catch (error) {
            setError('Failed to start job!')
            console.error(error)
        }
        setIsJobStarting(false)
    }

    return (
        <div>
            <span className={styles.bold}>New job</span>
            <div className={styles.dataType}>
                <Input
                    type="select"
                    name="select"
                    label="Select image to run the algorithm"
                    placeholder=""
                    value={computeType}
                    options={computeOptions.map((x) => x.name)}
                    onChange={handleSelectChange}
                />
            </div>
            <div>
                <div className={styles.inputWrap}>
                    <ReactDropzone
                        onDrop={(acceptedFiles) => onDrop(acceptedFiles)}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                {file === null && (
                                    <div className={styles.dragndrop}>
                                        Click or drop your notebook here
                                    </div>
                                )}
                                {file !== null && (
                                    <div className={styles.filleddragndrop}>
                                        You selected: {(file as any).path}
                                    </div>
                                )}
                            </div>
                        )}
                    </ReactDropzone>
                </div>
                <div className={styles.jobButtonWrapper}>
                    <Button
                        primary
                        onClick={() => startJob()}
                        disabled={
                            isJobStarting || file === null || computeType === ''
                        }
                        name="Purchase access"
                    >
                        Start job
                    </Button>
                </div>
            </div>
            {isJobStarting ? <Spinner message={messages[step]} /> : ''}
            {error !== '' && <div className={styles.error}>{error}</div>}
            {isPublished ? (
                <div className={styles.success}>
                    <p>Your job started!</p>
                    <Button link to="/history/">
                        Watch the progress in the history page.
                    </Button>
                </div>
            ) : (
                ''
            )}
        </div>
    )
}
