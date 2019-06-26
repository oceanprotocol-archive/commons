/// <reference types="Cypress" />
context('Consume', () => {
    before(() => {
        cy.visit(Cypress.env('CONSUME_ASSET'))

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
