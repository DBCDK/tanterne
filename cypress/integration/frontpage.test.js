// <reference types="Cypress" />
/* global cy, Cypress */

const baseUrl = Cypress.env('APP_HOST') + ':' + Cypress.env('APP_PORT');
const proBaseUrl = Cypress.env('APP_HOST') + ':' + Cypress.env('APP_PRO_PORT');
context('Testing frontpage', () => {
  it('Should render frontpage', () => {
    cy.visit(baseUrl);
    cy.get('body').should('contain', 'Eller vælg et emne her');
  });

  it('Should render pro frontpage', () => {
    cy.visit(proBaseUrl);
    cy.get('body').should('contain', 'DK5 PRO');
  });

});
