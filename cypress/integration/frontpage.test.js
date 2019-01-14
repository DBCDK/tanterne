/// <reference types="Cypress" />
const baseUrl = 'localhost:4013';
const proBaseUrl = 'localhost:4015';
// const baseUrl = Cypress.env('HOST') + ':' + Cypress.env('PRO_PORT');
context('Testing frontpage', () => {
  it('Should render frontpage', () => {
    cy.visit(baseUrl);
    cy.get('body').should('contain', 'Find en bog med DK5');
  });

  it('Should render pro frontpage', () => {
    cy.visit(proBaseUrl);
    cy.get('body').should('contain', 'DK5 PRO');
  });

});
