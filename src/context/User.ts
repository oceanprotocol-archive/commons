import React from 'react'

export const User = React.createContext({
    isLogged: false,
    web3: {},
    ocean: {},
    startLogin: () => {
        /* empty */
    }
})
