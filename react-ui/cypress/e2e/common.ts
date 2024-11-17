export const login = (username: string, password: string) => {
    cy.visit('/signin')
    const emailInputField = cy.get('#user-email');
    emailInputField.type(username);
    cy.contains('button', 'Login', { timeout: 2000 }).click();
    cy.origin('https://dev-8yg0ou7n4m4vg4kd.us.auth0.com', {args: {username, password}}, ({username, password}) => {
        cy.get('input#username').type(username)
        cy.contains('button[value=default]', 'Continue').click()
        cy.get('input#password').type(password, { log: false })
        cy.contains('button[value=default]', 'Continue').click()
    });
};

export const navigateToProjects = () => {
    cy.loginToAuth0(
        Cypress.env('testAccountUsername'),
        Cypress.env('testAccountPassword')
      )
    cy.url();
    cy.contains('Choose Organization', { timeout: 10000 }).should('be.visible');
    cy.contains('button', 'Enter', { timeout: 60000 }).first().click();
    cy.contains('Your Workspaces', { timeout: 10000 }).should('be.visible');
    cy.contains('button', 'Enter', { timeout: 30000 }).first().click();
    cy.contains('button', 'Create Project').should('be.visible');
};
