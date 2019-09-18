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

export function readFileAsync(file: File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onerror = () => {
            reader.abort()
            reject(new DOMException('Problem parsing input file.'))
        }
        reader.onload = () => {
            resolve(reader.result)
        }
        reader.readAsArrayBuffer(file)
    })
}
