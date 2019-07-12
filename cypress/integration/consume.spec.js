/// <reference types="Cypress" />
context('Consume', () => {
    before(() => {
        cy.visit(`/asset/${Cypress.env('CONSUME_ASSET')}`)

        // Alias button selector & wait for end of loading
        cy.get('button[name="Download"]', { timeout: 60000 })
            .first()
            .should('have.length', 1)
    })

    it('Download button is clickable when user is connected.', () => {
        cy.get('button[name="Download"]').should('not.be.disabled')
    })

    it('Consume asset and check if there is no error', () => {
        // Click consume button
        cy.get('button[name="Download"]').click()
        // Wait consume process to end
        cy.get('button[name="Download"]', { timeout: 600000 }).should(
            'contain',
            'Get file'
        )
        // check if there is no error
        cy.get('article>div').should(
            'not.contain',
            '. Sorry about that, can you try again?'
        )
    })
})
