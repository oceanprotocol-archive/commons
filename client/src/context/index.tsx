import React from 'react'
import { DDO } from '@oceanprotocol/squid'

export const User = React.createContext({
    mkplId: '',
    isLogged: false,
    isBurner: false,
    isWeb3Capable: false,
    isLoading: false,
    account: '',
    wallet: null,
    web3: null as any,
    ocean: null as any,
    box: {},
    balance: {
        eth: 0,
        ocn: 0
    },
    network: '',
    openWallet: () => {
        /* empty */
    },
    access3box: () => {
        /* empty */
    },
    requestFromFaucet: () => {
        /* empty */
    },
    airdropOceanTokens: () => {
        /* empty */
    },
    message: ''
})

export const Market = React.createContext({
    totalAssets: 0,
    categories: [''],
    network: '',
    networkMatch: false,
    aquarius: {
        queryMetadata: (query: any): Promise<any> => {
            /* empty */
            return [] as any
        },
        retrieveDDO: (did: string): Promise<DDO> => {
            /* empty */
            return null as any
        }
    },
    account: '',
    ocean: null as any
})
