import { Ocean, Logger, Config } from '@oceanprotocol/squid'
import { faucetUri } from './config'

export async function provideOcean(config: Config) {
  const ocean: Ocean = await Ocean.getInstance(config)
  return { ocean }
}

//
// Faucet
//
export interface FaucetResponse {
  success: boolean
  message: string
  trxHash?: string
}

export async function requestFromFaucet(account: string) {
  try {
    const url = `${faucetUri}/faucet`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        address: account,
        agent: 'commons'
      })
    })
    return response.json()
  } catch (error) {
    Logger.error('requestFromFaucet', error.message)
  }
}
