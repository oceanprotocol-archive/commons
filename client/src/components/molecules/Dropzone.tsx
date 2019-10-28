import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import styles from './Dropzone.module.scss'
import { formatBytes } from '../../utils/utils'

export default function Dropzone({
    handleOnDrop,
    disabled,
    multiple
}: {
    handleOnDrop(files: File[]): void
    disabled?: boolean
    multiple?: boolean
}) {
    const onDrop = useCallback(acceptedFiles => handleOnDrop(acceptedFiles), [
        handleOnDrop
    ])

    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject
    } = useDropzone({ onDrop })

    const files = acceptedFiles.map((file: any) => (
        <li key={file.path}>
            {file.path} - {formatBytes(file.size, 0)}
        </li>
    ))

    return (
        <>
            {acceptedFiles.length > 0 ? (
                <aside className={styles.dropzoneFiles}>
                    <ul>{files}</ul>
                </aside>
            ) : (
                <div
                    {...getRootProps({
                        className: isDragActive
                            ? styles.dragover
                            : disabled
                            ? styles.disabled
                            : styles.dropzone
                    })}
                >
                    <input {...getInputProps({ multiple })} />
                    <p>
                        {isDragActive && !isDragReject
                            ? `Drop it like it's hot!`
                            : multiple
                            ? `Drag 'n' drop some files here, or click to select files`
                            : `Drag 'n' drop a file here, or click to select a file`}
                        {}
                    </p>
                </div>
            )}
        </>
    )
}
