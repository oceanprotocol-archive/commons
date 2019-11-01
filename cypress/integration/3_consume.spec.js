/// <reference types="Cypress" />
describe('Consume', () => {
    it('should consume https:// file', () => {
        cy.fixture('did').then(did => {
            cy.visit(`/asset/${did}`)
        })

        // Button selector & wait for end of loading
        cy.get('button[name="Download"]', { timeout: 60000 }).should(
            'not.be.disabled'
        )

        // eslint-disable-next-line
        cy.wait(5000)
        // Wait for faucet
        // Click consume button
        cy.get('button[name="Download"]').click()
        // Wait consume process to end
        cy.get('button[name="Download"]', {
            timeout: 600000
        }).should('contain', 'Get file')
        // check if there is no error
        cy.get('article>div').should(
            'not.contain',
            '. Sorry about that, can you try again?'
        )
        // eslint-disable-next-line
        cy.wait(5000)
        // wait for file to download before closing browser
        // to prevent alert poping up
    })

    it('should consume ipfs:// file', () => {
        cy.fixture('did-ipfs').then(did => {
            cy.visit(`/asset/${did}`)
        })

        // Button selector & wait for end of loading
        cy.get('button[name="Download"]', { timeout: 60000 }).should(
            'not.be.disabled'
        )

        // eslint-disable-next-line
        cy.wait(5000)
        // Wait for faucet
        // Click consume button
        cy.get('button[name="Download"]').click()
        // Wait consume process to end
        cy.get('button[name="Download"]', {
            timeout: 600000
        }).should('contain', 'Get file')
        // check if there is no error
        cy.get('article>div').should(
            'not.contain',
            '. Sorry about that, can you try again?'
        )
        // eslint-disable-next-line
        cy.wait(5000)
        // wait for file to download before closing browser
        // to prevent alert poping up
    })
})
