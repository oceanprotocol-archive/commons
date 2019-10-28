/// <reference types="Cypress" />
describe('Faucet', () => {
    before(() => {
        cy.visit('/faucet')
        // Wait for end of loading
        cy.get('button[name="FaucetETH"]', { timeout: 60000 }).should(
            'have.length',
            1
        )
    })

    beforeEach(() => {
        cy.get('button[name="FaucetETH"]')
            .first()
            .as('button')
    })

    it('Faucet button is clickable when user is connected.', () => {
        cy.get('@button')
            .contains('Request ETH')
            .should('not.be.disabled')
    })

    it('should execute faucet call', () => {
        // Execute call
        cy.get('@button')
            .contains('Request ETH')
            .click()
        // Verify that we got response from server
        cy.contains(/(Successfully added|Already requested)/, {
            timeout: 60000
        }).should('be.visible')
    })
})
