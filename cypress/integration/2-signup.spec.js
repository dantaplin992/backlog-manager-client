describe("signup", () => {
  it("allows users to visit the signup page", () => {
    cy.visit('http://localhost:3000')
    cy.get("#link-to-signup").click()
    cy.contains("Sign Up")
  })

  it("allows a user to enter their information", () => {
    cy.visit('http://localhost:3000')
    cy.get("#link-to-signup").click()
    cy.get('input[name="username"]').type('User1')
    cy.get('input[name="email"').type('user@test.com')
    cy.get('input[name="password"]').type('password123')
  })
})