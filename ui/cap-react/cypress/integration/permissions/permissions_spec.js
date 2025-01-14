import { CREATE } from "../../routes";

describe("Validate Deposit Groups", () => {
  it("Deposit Groups for a  CMS member", () => {
    cy.login("cms@inveniosoftware.org", "cmscms");

    cy.visit(CREATE);

    // find out if the deposit groups are the correct ones
    // CMS Analysis and CMS Statistics Questionnaire
    cy.get("[data-cy=deposit-group-list] > div")
      .children()
      .each(value => {
        cy.wrap(value)
          .get("[data-cy=deposit-group-name]")
          .should(
            "have.attr",
            "name",
            "CMS Analysis" || "CMS Statistics Questionnaire"
          )
          .should(
            "not.have.attr",
            "name",
            "ATLAS Analysis" || "ALICE Analysis" || "LHCb Analysis"
          );
      });
  });
  it("Deposit Groups for an ATLAS member", () => {
    cy.login("atlas@inveniosoftware.org", "atlasatlas");

    cy.visit(CREATE);

    // find out if the deposit groups are the correct ones
    // CMS Analysis and CMS Statistics Questionnaire
    cy.get("[data-cy=deposit-group-list] > div")
      .children()
      .each(value => {
        cy.wrap(value)
          .get("[data-cy=deposit-group-name]")
          .should("have.attr", "name", "ATLAS Analysis");
      })
      .should(
        "not.have.attr",
        "name",
        "CMS Analysis" ||
          "CMS Statistics Questionnaire" ||
          "ALICE Analysis" ||
          "LHCb Analysis"
      );
  });
  it("Deposit Groups for an Alice member", () => {
    cy.login("alice@inveniosoftware.org", "alicealice");

    cy.visit(CREATE);

    // find out if the deposit groups are the correct ones
    // CMS Analysis and CMS Statistics Questionnaire
    cy.get("[data-cy=deposit-group-list] > div")
      .children()
      .each(value => {
        cy.wrap(value)
          .get("[data-cy=deposit-group-name]")
          .should("have.attr", "name", "ALICE Analysis")
          .should(
            "not.have.attr",
            "name",
            "CMS Analysis" ||
              "CMS Statistics Questionnaire" ||
              "ATLAS Analysis" ||
              "LHCb Analysis"
          );
      });
  });
  it("Deposit Groups for an LHCB member", () => {
    cy.login("lhcb@inveniosoftware.org", "lhcblhcb");

    cy.visit(CREATE);

    // find out if the deposit groups are the correct ones
    // CMS Analysis and CMS Statistics Questionnaire
    cy.get("[data-cy=deposit-group-list] > div")
      .children()
      .each(value => {
        cy.wrap(value)
          .get("[data-cy=deposit-group-name]")
          .should("have.attr", "name", "LHCb Analysis")
          .should(
            "not.have.attr",
            "name",
            "CMS Analysis" ||
              "CMS Statistics Questionnaire" ||
              "ALICE Analysis" ||
              "ATLAS Analysis"
          );
      });
  });
});

describe("Visit create path, with a specific analysis name", () => {
  it("Cms analysis should be  pre selected", () => {
    cy.login("cms@inveniosoftware.org", "cmscms");

    cy.visit(`${CREATE}/cms-analysis`);

    // find out if the deposit groups are the correct ones
    // CMS Analysis and CMS Statistics Questionnaire
    cy.get("[data-cy=deposit-group-list] > div")
      .children()
      .each(value => {
        cy.wrap(value)
          .get("[data-cy=deposit-group-cms-analysis-wrapper]")
          .get("[data-cy=deposit-group-checkmark]")
          .should("be.visible");
      });
  });

  it("Fetch an analysis with no permissions", () => {
    cy.login("cms@inveniosoftware.org", "cmscms");

    cy.visit(`${CREATE}/atlas-analysis`);

    cy.get("[data-cy=create-form-error-page]").should("be.visible");
  });
});
