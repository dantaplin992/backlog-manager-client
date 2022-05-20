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

  it("allows a user to enter their credentials", () => {
    cy.visit('http://localhost:3000')
    cy.get('input[name="username-input"]').type("user1")
    cy.get('input[name="password-input"]').type("password123")
  })

  it("allows a user to log in if their credentials are correct", () => {
    cy.visit('http://localhost:3000')
    cy.get('input[name="username-input"]').type("a")
    cy.get('input[name="password-input"]').type("a")
    cy.get('button[name="login-submit"]').click()
    cy.contains("Logged in as")
  })

  it("rejects incorrect credentials", () => {
    cy.visit('http://localhost:3000')
    cy.get('input[name="username-input"]').type("a")
    cy.get('input[name="password-input"]').type("b")
    cy.get('button[name="login-submit"]').click()
    cy.on('window:alert', (text) => {
      expect(text).to.contains('The credentials you entered are incorrect');
    });
  })

  it("allows a user to log out", () => {
    cy.visit('http://localhost:3000')
    cy.get('input[name="username-input"]').type("a")
    cy.get('input[name="password-input"]').type("a")
    cy.get('button[name="login-submit"]').click()
    cy.contains("Logged in as")
    cy.get('button[name="log-out-button"]').click()
    cy.contains("Log In")
  })
})