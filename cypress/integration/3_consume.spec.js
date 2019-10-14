/// <reference types="Cypress" />
describe('Consume', () => {
    beforeEach(() => {
        cy.fixture('did').then(did => {
            cy.visit(`/asset/${did}`)
        })

        // Alias button selector & wait for end of loading
        cy.get('button[name="Download"]', { timeout: 60000 })
            .first()
            .should('have.length', 1)
    })

    it('Download button is clickable when user is connected.', () => {
        cy.get('button[name="Download"]').should('not.be.disabled')
    })

    it('should consume https:// file', () => {
        // eslint-disable-next-line
        cy.wait(10000)
        // Wait for faucet
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
        // eslint-disable-next-line
        cy.wait(10000)
        // wait for file to download before closing browser
        // to prevent alert poping up
    })

    it('should consume ipfs:// file', () => {
        cy.fixture('did-ipfs').then(did => {
            cy.visit(`/asset/${did}`)
        })

        // Alias button selector & wait for end of loading
        cy.get('button[name="Download"]', { timeout: 60000 })
            .first()
            .should('have.length', 1)

        // eslint-disable-next-line
        cy.wait(10000)
        // Wait for faucet
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
        // eslint-disable-next-line
        cy.wait(10000)
        // wait for file to download before closing browser
        // to prevent alert poping up
    })
})
