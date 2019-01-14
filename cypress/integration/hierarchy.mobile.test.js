/// <reference types="Cypress" />
const baseUrl = 'localhost:4013';
// const baseUrl = Cypress.env('HOST') + ':' + Cypress.env('PORT');
context('Testing Hierarchy in mobile view', () => {
  beforeEach(() => {
    cy.viewport(320, 568);
    cy.visit(baseUrl);
  });

  it('Should navigagte to frontpage', () => {
    cy.get('.category-tile--container').first().click();
    cy.get('.hierarchy--navbar--href').should('be.visible');
    cy.get('.hierarchy--navbar--href').click();
    cy.get('.search-field--button--text').should('be.visible');
    cy.url().should('eq', 'http://localhost:4013/');
  });

  it('Should navigate back to the frontpage', () => {
    cy.visit(baseUrl + '/#!/hierarchy/00.109');
    cy.get('.hierarchy--navbar--title').should('be.visible');
    cy.get('.hierarchy--navbar--href').should('have.attr', 'href', '#!/hierarchy/00.1');
    // or another way
    cy.get('.hierarchy--navbar--href').invoke('attr', 'href').should('contain', '#!/hierarchy/00.1');

    cy.get('.hierarchy--navbar--href').click();
    cy.get('.hierarchy--navbar--href').should('have.attr', 'href', '#!/hierarchy/00');

    cy.get('.hierarchy--navbar--href').click();
    cy.get('.hierarchy--navbar--href').should('have.attr', 'href', '#!/hierarchy/00-07');

    cy.get('.hierarchy--navbar--href').click();
    cy.get('.hierarchy--navbar--href').should('have.attr', 'href', '/');

    cy.get('.hierarchy--navbar--href').click();
    cy.get('.hierarchy--navbar').should('not.be.visible');
  });
});
