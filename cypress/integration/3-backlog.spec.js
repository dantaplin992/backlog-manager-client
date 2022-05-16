describe("backlog", () => {
  it("allows a user to add a game to the list", () => {
    cy.visit('http://localhost:3000')
    cy.get('input[name="username-input"]').type("a")
    cy.get('input[name="password-input"]').type("a")
    cy.get('button[name="login-submit"]').click()
    cy.get('input[name="game-input"]').type("pokemon")
    cy.get('button[name="game-submit"]').click()
    cy.contains("pokemon")
  })
})