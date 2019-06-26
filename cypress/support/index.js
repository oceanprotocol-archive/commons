/// <reference types="Cypress" />
import Web3 from 'web3'
import HDWalletProvider from 'truffle-hdwallet-provider'

before(function() {
    cy.on('window:before:load', win => {
        const provider = new HDWalletProvider(
            Cypress.env('SEEDPHRASE'),
            Cypress.env('NODE_URI')
        )
        win.web3 = new Web3(provider)
        win.ethereum = win.web3
    })
})
