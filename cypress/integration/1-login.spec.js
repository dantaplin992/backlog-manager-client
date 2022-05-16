describe("login", () => {
  it("loads successfully", () => {
    cy.visit('http://localhost:3000')
  })

  it("lands on the login page upon loading", () => {
    cy.visit('http://localhost:3000')
    cy.contains("Log In")
  })

  it("contains a link to the Sign Up page", () => {
    cy.visit('http://localhost:3000')
    cy.get("#link-to-signup").click()
    cy.contains("Sign Up")
  })
})