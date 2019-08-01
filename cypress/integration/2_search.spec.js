/// <reference types="Cypress" />
context('Search', () => {
    before(() => {
        cy.visit('/')
        // Wait for end of loading
        cy.get('button', { timeout: 60000 }).should('have.length', 1)
    })

    it('Search for assets from homepage', () => {
        // Fill search phrase
        cy.get('input#search').type('Title test')
        // Start search
        cy.get('button')
            .contains('Search')
            .click()
        // Verify there are results
        cy.get('article > a', { timeout: 60000 }).should(
            'have.length.greaterThan',
            0
        )
    })
})
