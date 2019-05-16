import Web3 from 'web3'
import { provideOcean, requestFromFaucet } from './ocean'

describe('ocean', () => {
    const web3 = new Web3(Web3.givenProvider)

    it('provideOcean can be called', async () => {
        const response = await provideOcean(web3)
        expect(response.ocean).toBeTruthy()
    })

    it('requestFromFaucet can be called', async () => {
        const response = await requestFromFaucet('0xxxxxx')
        response &&
            expect(response.errors[0].msg).toBe('Invalid Ethereum address')
    })
})
