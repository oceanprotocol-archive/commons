import React from 'react'

export const User = React.createContext({
    isLogged: false,
    isLoading: false,
    isWeb3: false,
    isNile: false,
    account: '',
    web3: {},
    ocean: {},
    balance: {
        eth: 0,
        ocn: 0
    },
    network: '',
    startLogin: () => {
        /* empty */
    },
    requestFromFaucet: () => {
        /* empty */
    }
})
