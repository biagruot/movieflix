describe('search page', () => {
  it('should load the page', () => {
    cy.visit('/');
    cy.get('[data-testid="searchPageTitle"]').should('exist').and('be.visible');
    cy.get('[data-testid="searchInput"]').should('exist').and('be.visible');
    cy.get('[data-testid="searchFilter"]').should('exist').and('be.visible');
  });

  it('should load results', () => {
    cy.visit('/');

    cy.get('[data-testid="searchInput"]').type('Titanic');
    cy.wait(5000);
    cy.get('[data-testid="searchResults"]').should('exist').and('be.visible');
    cy.get('[data-testid="searchPaginator"]').should('exist').and('be.visible');
    cy.get('[data-testid="searchError"]').should('not.exist');
  });

  it('should show error', () => {
    cy.visit('/');

    cy.get('[data-testid="searchInput"]').type('This movie doesnt exist');
    cy.wait(5000);
    cy.get('[data-testid="searchError"]').should('exist').and('be.visible');
    cy.get('[data-testid="searchResults"]').should('not.exist');
    cy.get('[data-testid="searchPaginator"]').should('not.exist');
  });

  it('should load next page', () => {
    cy.visit('/');

    cy.get('[data-testid="searchInput"]').type('Titanic');
    cy.wait(5000);
    cy.get('[data-testid="searchPaginator"]').should('exist').and('be.visible');
    cy.get(
      '[data-testid="searchPaginator"] .mat-mdc-paginator-navigation-next'
    ).click();
    cy.wait(5000);
    cy.get('[data-testid="searchResults"]').should('exist').and('be.visible');
    cy.get('[data-testid="searchPaginator"]').should('exist').and('be.visible');
    cy.get('[data-testid="searchError"]').should('not.exist');
  });

  it.only('should go to details page', () => {
    cy.visit('/');

    cy.get('[data-testid="searchInput"]').type('Titanic');
    cy.wait(5000);
    cy.get('[data-testid="goToDetailsBtn"]').first().click();
    cy.url().should('include', '/details/');
  });
});
