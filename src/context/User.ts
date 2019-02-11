import React from 'react'

export const User = React.createContext({
    isLogged: false,
    isLoading: false,
    isWeb3: false,
    web3: {},
    ocean: {},
    startLogin: () => {
        /* empty */
    }
})
