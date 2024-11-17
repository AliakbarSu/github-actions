import '@chromatic-com/cypress/support';

Cypress.on('uncaught:exception', () => {
    return false;
});
