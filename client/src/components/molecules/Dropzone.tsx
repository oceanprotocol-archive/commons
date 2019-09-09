import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import styles from './Dropzone.module.scss'

export default function Dropzone({
    handleOnDrop,
    disabled
}: {
    handleOnDrop(files: File[]): void
    disabled?: boolean
}) {
    const onDrop = useCallback(acceptedFiles => handleOnDrop(acceptedFiles), [
        handleOnDrop
    ])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop
    })

    return (
        <div
            {...getRootProps({
                className: isDragActive
                    ? styles.dragover
                    : disabled
                    ? styles.disabled
                    : styles.dropzone
            })}
        >
            <input {...getInputProps()} />
            <p>{`Drag 'n' drop some files here, or click to select files`}</p>
        </div>
    )
}
