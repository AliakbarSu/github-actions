export const login = () => {
    const emailInputField = cy.get('#user-email');
    emailInputField.type(Cypress.env('testAccountEmail'));
    cy.contains('button', 'Login', { timeout: 2000 }).click();
    cy.origin('https://dev-8yg0ou7n4m4vg4kd.us.auth0.com', () => {
        // cy.get('#username').type(Cypress.env('testAccountEmail'));
        // cy.get('button[type="submit"][name="action"]').click();
        // cy.get('#password').type(Cypress.env('testAccountPassword'), { log: false });
        // cy.get('.password-toggle-label').click();
        cy.get('input#username').type(Cypress.env('testAccountEmail'))
        cy.contains('button[value=default]', 'Continue').click()
        cy.get('input#password').type(Cypress.env('testAccountPassword'), { log: false })
        cy.screenshot()
        cy.contains('button[value=default]', 'Continue').click()
        cy.url().should('equal', 'https://survesy-sandbox-604-preview-145578957084.us-central1.run.app')
    });
};

export const navigateToProjects = () => {
    login();
    cy.url();
    cy.contains('Choose Organization', { timeout: 10000 }).should('be.visible');
    cy.contains('button', 'Enter', { timeout: 60000 }).first().click();
    cy.contains('Your Workspaces', { timeout: 10000 }).should('be.visible');
    cy.contains('button', 'Enter', { timeout: 30000 }).first().click();
    cy.contains('button', 'Create Project').should('be.visible');
};
