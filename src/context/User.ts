import React from 'react'

export const User = React.createContext({
    isLogged: false,
    isLoading: false,
    isWeb3: false,
    account: '',
    web3: {},
    ocean: {},
    startLogin: () => {
        /* empty */
    }
})
