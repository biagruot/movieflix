it('should load movie details', () => {
  cy.visit('/details/tt0046435');

  cy.wait(5000);
  cy.get('[data-testid="movieDetails"]').should('exist').and('be.visible');
  cy.get('[data-testid="detailsHeader"]').should('exist').and('be.visible');
  cy.get('[data-testid="detailsError"]').should('not.exist');
});

it('should show error', () => {
  cy.visit('/details/asdasdasd');

  cy.wait(5000);
  cy.get('[data-testid="movieDetails"]').should('not.exist');
  cy.get('[data-testid="detailsError"]').should('exist').and('be.visible');
});

it('should go back to search page', () => {
  cy.visit('/details/tt0046435');

  cy.wait(5000);
  cy.get('[data-testid="detailsHeader"]').click();
  cy.url().should('include', '/search');
});
