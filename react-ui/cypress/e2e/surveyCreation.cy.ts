import { navigateToProjects } from "./common";

describe.skip("Login screen", () => {
  it("should create project", () => {
    cy.visit("/login");
    cy.document().contains("Login");
    navigateToProjects();

    cy.contains("button", "Create Project", { timeout: 10000 }).click();

    cy.get("#project-name").type("test project");
    cy.get("#project-description").type("this is a test project");
    cy.contains("p", "Project Admin(s)*").click();
    cy.contains("p", "Norberto Carosella").click();

    cy.contains("button", "Create Project").click();
    cy.contains("test project", { timeout: 10000 }).should("be.visible");
  });

  it("should create survey", () => {
    cy.visit("/login");
    cy.document().contains("Login");
    navigateToProjects();

    cy.contains("button", "Enter", { timeout: 10000 }).first().click();
    cy.contains("button", "Create Survey", { timeout: 10000 }).click();

    cy.get('input[name="name"]').type("test survey");
    cy.get('textarea[name="description"]').type("this is a test survey");
    cy.get('input[name="target_sample_size"]').type("2442");
    cy.get('input[name="max_sample_size"]').type("533");

    cy.get('button[form="survey-creation-form"]').click();
    cy.contains("Scope of Work Option", { timeout: 10000 }).should(
      "be.visible"
    );

    cy.contains("button", "Enter Scope of Work Manually").click();
    cy.contains("button", "Add Scope of Work Element").click();

    cy.contains("h6", "Double click to edit", { timeout: 10000 }).should(
      "be.visible"
    );

    cy.contains("button", "Go to Context").click();

    cy.contains("button", "Background", { timeout: 10000 }).should(
      "be.visible"
    );

    cy.contains("button", "Go to Overview").click();

    cy.contains("button", "Yes", { timeout: 10000 }).click();

    cy.contains("button", "Build Manually", { timeout: 10000 }).click();

    cy.wait(2000);

    cy.contains("span", "Add Section", { timeout: 10000 }).first().click();

    cy.contains("span", "Section name", { timeout: 40000 }).should(
      "be.visible"
    );

    cy.contains("button", "Go to Builder", { timeout: 10000 }).click();

    cy.contains("span", "Quotas", { timeout: 10000 }).should("be.visible");
    cy.contains("span", "Variables", { timeout: 10000 }).should("be.visible");
    cy.contains("span", "Designer", { timeout: 10000 }).should("be.visible");
  });
});
