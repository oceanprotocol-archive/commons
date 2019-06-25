/// <reference types="Cypress" />
import Web3 from 'web3'
import HDWalletProvider from 'truffle-hdwallet-provider'

context('Consume', () => {
    before(() => {
        cy.on('window:before:load', win => {
            const provider = new HDWalletProvider(
                Cypress.env('SEEDPHRASE')
                    ? Cypress.env('SEEDPHRASE')
                    : 'taxi music thumb unique chat sand crew more leg another off lamp',
                Cypress.env('NODE_URI')
                    ? Cypress.env('NODE_URI')
                    : 'https://nile.dev-ocean.com'
            )
            win.web3 = new Web3(provider)
            win.ethereum = win.web3
        })

        cy.visit(
            Cypress.env('CONSUME_ASSET')
                ? Cypress.env('CONSUME_ASSET')
                : 'http://localhost:3000/asset/did:op:8014d305dcb44b42a5355791a2f016a654a61184456a4d178dc6e5913deb3a5c'
        )

        // Wait for end of loading
        cy.get('button', { timeout: 60000 }).should('have.length', 1)
    })

    it('Download button is clickable when user is connected.', () => {
        cy.get('button').should('not.be.disabled')
    })

    it('Consume asset and check if there is no error', () => {
        // Click consume button
        cy.get('button').click()
        // Wait consume process to end
        cy.get('button', { timeout: 120000 }).should('contain', 'Get file')
        // check if there is no error
        cy.get('article>div').should(
            'not.contain',
            '. Sorry about that, can you try again?'
        )
    })
})
