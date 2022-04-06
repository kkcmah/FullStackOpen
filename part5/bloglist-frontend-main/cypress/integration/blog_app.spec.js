// blog_app.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.request("POST", "http://localhost:3003/api/users", {
      username: "myusername",
      name: "myname",
      password: "mypassword",
    });
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
    cy.contains("username");
    cy.contains("password");
    cy.contains("Login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("input[name='Username']").type("myusername");
      cy.get("input[name='Password']").type("mypassword");
      cy.get("#login-btn").click();
      cy.get("html").should("contain", "myname logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("input[name='Username']").type("myusername");
      cy.get("input[name='Password']").type("wrong password");
      cy.get("#login-btn").click();
      cy.get(".error")
        .should("contain", "wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)");
      cy.get("html").should("not.contain", "myname logged in");
    });
  });

  describe.only("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "myusername", password: "mypassword" });
    });

    it("A blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("input[placeholder='type title here']").type("blog title");
      cy.get("input[placeholder='type author here']").type("blog author");
      cy.get("input[placeholder='type url here']").type("blog url");
      cy.get(".create-btn").click();
      cy.contains("blog title");
    });
  });
});
