/// <reference types="Cypress" />
context('Faucet', () => {
    before(() => {
        cy.visit('/faucet')
        // Wait for end of loading
        cy.get('button[name="FaucetEther"]', { timeout: 60000 }).should(
            'have.length',
            1
        )
    })

    beforeEach(() => {
        cy.get('button[name="FaucetEther"]')
            .first()
            .as('button')
    })

    it('Faucet button is clickable when user is connected.', () => {
        cy.get('@button')
            .contains('Request Ether')
            .should('not.be.disabled')
    })

    it('Execute faucet call', () => {
        // Execute call
        cy.get('@button')
            .contains('Request Ether')
            .click()
        // Verify that we got response from server
        cy.contains(/(Successfully added|Already requested)/, {
            timeout: 60000
        }).should('be.visible')
    })
})
