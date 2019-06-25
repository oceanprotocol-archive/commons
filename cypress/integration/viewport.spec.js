/// <reference types="Cypress" />

context('Viewport', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('cy.viewport() - set the viewport size and dimension', () => {
        cy.get('#root > div > header > div > a > h1').should('be.visible')
        cy.viewport(320, 480)

        cy.get('#root > div > header > div > a > h1').should('not.be.visible')
    })
})
