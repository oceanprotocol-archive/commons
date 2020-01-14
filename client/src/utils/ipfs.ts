import { Buffer } from "buffer"
import IPFS from "ipfs-http-client"
import axios from "axios"
import { ipfsGatewayUri } from "../config"

export interface IpfsConfig {
    protocol: string
    host: string
    port: string
}

export function getIpfsInstance(config: IpfsConfig) {
    return new IPFS(config)
}

export async function uploadJSON(ipfs: any, _json: any) {
    let buffer = await Buffer.from(JSON.stringify(_json))
    let ipfsResponse = await ipfs.add(buffer)
    return ipfsResponse[0].path
}

export async function fetchJSON(ipfs: any, _hash: any) {
    try {
      // let response = await ipfs.get(`/ipfs/${_hash}`)
      // let content = response[0].content
      // return JSON.parse(content.toString())
      const rs = await axios.get(`${ipfsGatewayUri}/ipfs/${_hash}`)
      return rs.data
    } catch(error) {
      console.log('Error while ipfs.get', error.message)
      // const rs = await axios.get(`${ipfsGatewayUri}/ipfs/${_hash}`)
      // return rs.data
    }

}

export async function uploadMessageKit(ipfs: any, _messageKit: any) {
  let json = {
    payload: _messageKit
  }
  return await uploadJSON(ipfs, json)
  
}

export async function fetchMessageKit(ipfs: any, _hash: any) {
  const json = await fetchJSON(ipfs, _hash)
  return json.payload
}
