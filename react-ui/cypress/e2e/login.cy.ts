import { login } from './common';

describe('Login screen', () => {
    it('should load the login screen when not logged in', () => {
        cy.visit('/');
        cy.document().contains('Login');
    });

    it('should login successfully', () => {
        cy.visit('/login');
        cy.document().contains('Login');
        login();
        cy.url();
        cy.contains('Choose Organization', { timeout: 10000 }).should('be.visible');
    });
});
