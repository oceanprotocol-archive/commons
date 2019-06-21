/// <reference types="Cypress" />
import Web3 from 'web3'
import HDWalletProvider from 'truffle-hdwallet-provider'

context('Faucet', () => {
    before(() => {
        cy.on('window:before:load', win => {
            const provider = new HDWalletProvider(
                Cypress.env('SEEDPHRASE'),
                Cypress.env('NODE_URI')
            )
            win.web3 = new Web3(provider)
            win.ethereum = win.web3
        })

        cy.visit('http://localhost:3000/faucet')
        // Wait for end of loading
        cy.get('button', { timeout: 60000 }).should('have.length', 1)
    })

    it('Faucet button is clickable when user is connected.', () => {
        cy.get('button')
            .contains('Request Ether')
            .should('not.be.disabled')
    })

    it('Execute faucet call', () => {
        // Execute call
        cy.get('button')
            .contains('Request Ether')
            .click()
        // Verify that we got response from server
        cy.contains(/(Successfully added|Already requested)/, {
            timeout: 60000
        }).should('be.visible')
    })
})
