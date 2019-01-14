/// <reference types="Cypress" />
const baseUrl = 'localhost:4013/';
// const baseUrl = Cypress.env('HOST') + ':' + Cypress.env('PORT');
context('Testing the searchresultspage on normal version', () => {
  beforeEach(() => {
    cy.visit(baseUrl + '#!/search/geologi/10/0/relevance/dictionary');
  });

  it('No CartButtons items should be visible', () => {
    cy.get('#cart-button-55').should('not.be.visible');
    // const allCartButtons = browser.elements('.cart-button-container').value;
    // assert.equal(allCartButtons.length, 0);
    cy.get('.cart-button-container').should('have.length', 0);
  });

  it('Should not display the comparer', () => {
    cy.get('.comparer--content').should('not.be.visible');
    cy.get('#comparer--content').should('not.be.visible');
  });
});
