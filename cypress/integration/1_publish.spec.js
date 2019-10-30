/// <reference types="Cypress" />
describe('Publish', () => {
    beforeEach(() => {
        cy.visit('/publish')

        cy.get('article>div', { timeout: 60000 }).should(
            'contain',
            'Essentials'
        )
    })

    it('should publish https:// file', () => {
        // Fill title
        cy.get('input#name').type('Commons Integration Test')
        // Open Add a file form
        cy.get('button')
            .contains('+ From URL')
            .click()
        // Fill url of file
        cy.get('input#url').type(
            'https://oceanprotocol.com/tech-whitepaper.pdf'
        )
        // Add file to main form
        cy.get('button')
            .contains('Add File')
            .click()
        // Verify and nove to next step
        cy.get('button', { timeout: 60000 })
            .contains('Next →')
            .should('not.be.disabled')
            .click()
        // Verify we are on next step
        cy.get('article>div').should('contain', 'Information')
        // Fill description
        cy.get('textarea#description').type('This is test description')
        // Pick category
        cy.get('select#categories').select('Biology')
        // Verify and move to next step
        cy.get('button')
            .contains('Next →')
            .should('not.be.disabled')
            .click()
        // Verify we are on next step
        cy.get('article>div').should('contain', 'Authorship')
        // Fill author
        cy.get('input#author').type('Super Author')
        // Fill copyright holder
        cy.get('input#copyrightHolder').type('Super Copyright Holder')
        // Pick author
        cy.get('select#license').select('Public Domain')
        // Verify and move to next step
        cy.get('button')
            .contains('Next →')
            .should('not.be.disabled')
            .click()
        // Verify we are on next step
        cy.get('article>div').should('contain', 'Register')
        // Start publish process
        cy.get('button')
            .contains('Register asset')
            .should('not.be.disabled')
            .click()
        // Wait for finish
        cy.contains('Your asset is published!', {
            timeout: 12000
        }).should('be.visible')

        // Store DID
        cy.get('a')
            .contains('See published asset')
            .invoke('attr', 'href')
            .then(href => {
                cy.writeFile(
                    'cypress/fixtures/did.txt',
                    href.replace('/asset/', '')
                )
            })
    })

    it('should publish ipfs:// file', () => {
        // Fill title
        cy.get('input#name').type('Commons Integration IPFS Test')
        // Open Add a file form
        cy.get('button')
            .contains('+ From URL')
            .click()
        // Fill url of file
        cy.get('input#url').type(
            'ipfs://QmX5LRpEVocfks9FNDnRoK2imf2fy9mPpP4wfgaDVXWfYD/video.mp4'
        )
        // Add file to main form
        cy.get('button')
            .contains('Add File')
            .click()
        // Verify and nove to next step
        cy.get('button', { timeout: 60000 })
            .contains('Next →')
            .should('not.be.disabled')
            .click()
        // Verify we are on next step
        cy.get('article>div').should('contain', 'Information')
        // Fill description
        cy.get('textarea#description').type('This is test description')
        // Pick category
        cy.get('select#categories').select('Biology')
        // Verify and move to next step
        cy.get('button')
            .contains('Next →')
            .should('not.be.disabled')
            .click()
        // Verify we are on next step
        cy.get('article>div').should('contain', 'Authorship')
        // Fill author
        cy.get('input#author').type('Super Author')
        // Fill copyright holder
        cy.get('input#copyrightHolder').type('Super Copyright Holder')
        // Pick author
        cy.get('select#license').select('Public Domain')
        // Verify and move to next step
        cy.get('button')
            .contains('Next →')
            .should('not.be.disabled')
            .click()
        // Verify we are on next step
        cy.get('article>div').should('contain', 'Register')
        // Start publish process
        cy.get('button')
            .contains('Register asset')
            .should('not.be.disabled')
            .click()
        // Wait for finish
        cy.contains('Your asset is published!', {
            timeout: 12000
        }).should('be.visible')

        // Store DID
        cy.get('a')
            .contains('See published asset')
            .invoke('attr', 'href')
            .then(href => {
                cy.writeFile(
                    'cypress/fixtures/did-ipfs.txt',
                    href.replace('/asset/', '')
                )
            })
    })
})
