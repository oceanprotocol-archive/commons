/// <reference types="Cypress" />
import Web3 from 'web3'
import HDWalletProvider from 'truffle-hdwallet-provider'

context('Publish', () => {
    before(() => {
        cy.on('window:before:load', win => {
            const provider = new HDWalletProvider(
                'taxi music thumb unique chat sand crew more leg another off lamp',
                'https://duero.dev-ocean.com'
            )
            win.web3 = new Web3(provider)
            win.ethereum = win.web3
        })

        cy.visit('http://localhost:3000/publish')

        cy.get('article>div', { timeout: 60000 }).should(
            'contain',
            'Essentials'
        )
    })

    it('Publish flow', () => {
        // Fill title
        cy.get('input#name').type('Title test')
        // Open Add a file form
        cy.get('button')
            .contains('+ Add a file')
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
        cy.get('button')
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
    })
})
