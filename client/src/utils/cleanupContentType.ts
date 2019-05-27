const cleanupContentType = (contentType: string) => {
    // strip away the 'application/' part
    const contentTypeSplit = contentType.split('/')[1]

    let contentTypeCleaned

    // TODO: add all the possible archive & compression MIME types
    if (
        contentType === 'application/x-lzma' ||
        contentType === 'application/x-xz' ||
        contentType === 'application/x-tar' ||
        contentType === 'application/x-gtar' ||
        contentType === 'application/x-bzip2' ||
        contentType === 'application/x-gzip' ||
        contentType === 'application/x-7z-compressed' ||
        contentType === 'application/x-rar-compressed' ||
        contentType === 'application/x-zip-compressed' ||
        contentType === 'application/x-apple-diskimage'
    ) {
        contentTypeCleaned = contentTypeSplit
            .replace('x-', '')
            .replace('-compressed', '')
    } else {
        contentTypeCleaned = contentTypeSplit
    }

    // Manual replacements
    contentTypeCleaned = contentTypeCleaned
        .replace(
            'vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'xlsx'
        )
        .replace('vnd.ms-excel', 'xls')
        .replace('apple-diskimage', 'dmg')
        .replace('octet-stream', 'Binary')
        .replace('svg+xml', 'svg')

    return contentTypeCleaned
}

export default cleanupContentType
