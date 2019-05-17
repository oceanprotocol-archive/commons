/// <reference types="Cypress" />
import Web3 from 'web3'
import PrivateKeyProvider from 'truffle-privatekey-provider'

context('Consume', () => {
    beforeEach(() => {
        cy.on('window:before:load', win => {
            const provider = new PrivateKeyProvider(
                'd631de5b7e9cf451135896c833187c8b4dc230bf47756a9a2ca4ffccc161175e',
                'http://localhost:8545'
            )
            win.web3 = new Web3(provider)
        })

        cy.visit(
            'http://localhost:3000/asset/did:op:52f2ed716f97463e97beeb414195a075b606675874204e3da39b0c237377dbd3'
        )
        // wait for the asset details to have loaded
        cy.get('button', { timeout: 10000 }).should('have.length', 1)
    })

    it('Download button is clickable when user is connected.', () => {
        cy.get('button').should('not.be.disabled')
    })
})
