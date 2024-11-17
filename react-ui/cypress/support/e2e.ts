import '@chromatic-com/cypress/support';
import { login } from '../e2e/common';

Cypress.on('uncaught:exception', () => {
    return false;
});


declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            loginToAuth0(username: string, password: string): Chainable<void>;
        }
    }
}



Cypress.Commands.add('loginToAuth0', (username: string, password: string) => {
    const log = Cypress.log({
      displayName: 'AUTH0 LOGIN',
      message: [`🔐 Authenticating | ${username}`],
      // @ts-ignore
      autoEnd: false,
    })
    log.snapshot('before')
  
    cy.session(
      `auth0-${username}`,
      () => {
        login(username, password)
      },
      {
        validate: () => {
          // Validate presence of access token in localStorage.
          cy.wrap(localStorage)
            .invoke('getItem', 'authAccessToken')
            .should('exist')
        },
      }
    )
  
    log.snapshot('after')
    log.end()
  })