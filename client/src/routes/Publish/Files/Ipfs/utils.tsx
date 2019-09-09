/* eslint-disable no-console */
import axios from 'axios'

export async function pingUrl(url: string) {
    try {
        const response = await axios(url)
        if (response.status !== 200) console.error(`Not found: ${url}`)

        console.log(`File found: ${url}`)
        return
    } catch (error) {
        console.error(error.message)
    }
}

export function formatBytes(a: number, b: number) {
    if (a === 0) return '0 Bytes'
    const c = 1024
    const d = b || 2
    const e = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const f = Math.floor(Math.log(a) / Math.log(c))

    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + ' ' + e[f]
}
