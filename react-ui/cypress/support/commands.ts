import { addCompareSnapshotCommand } from 'cypress-visual-regression/dist/command';
import { mount } from 'cypress/react18';
import { login } from '../e2e/common';

/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//     namespace Cypress {
//         interface Chainable {
//             login(email: string, password: string): Chainable<void>;
//
//             drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>;
//
//             dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>;
//
//             visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>;
//         }
//     }
// }

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            mount: typeof mount;
            loginToAuth0(username: string, password: string): Chainable<void>;
        }
    }
}

Cypress.Commands.add('mount', mount);
addCompareSnapshotCommand();


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
