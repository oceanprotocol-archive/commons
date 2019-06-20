/// <reference types="Cypress" />
import Web3 from 'web3'
import HDWalletProvider from 'truffle-hdwallet-provider'

context('Search', () => {
    before(() => {
        cy.on('window:before:load', win => {
            const provider = new HDWalletProvider(
                'taxi music thumb unique chat sand crew more leg another off lamp',
                'https://nile.dev-ocean.com'
            )
            win.web3 = new Web3(provider)
            win.ethereum = win.web3
        })

        cy.visit('http://localhost:3000')
        // Wait for end of loading
        cy.get('button', { timeout: 20000 }).should('have.length', 1)
    })

    it('Search for assets from homepage', () => {
        // Fill search phrase
        cy.get('input#search').type('Title test')
        // Start search
        cy.get('button')
            .contains('Search')
            .click()
        // Verify there are results
        cy.get('article > a', { timeout: 10000 }).should(
            'have.length.greaterThan',
            0
        )
    })
})
