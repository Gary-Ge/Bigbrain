describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
    // Register
    cy.wait(100)
    cy.get('a[href="/register"]').contains('No account? Sign Up Now!').click()
    cy.get('#name').type('Test Name')
    cy.get('#email').type('Tester@gmail.com')
    cy.get('#password').type('123456')
    cy.get('button').contains('Sign Up').click()
    // Add game
    cy.wait(100)
    cy.get('[data-testid="add-card-action-area"]').click()
    cy.get('#game-name').type('Test Game')
    cy.get('button').contains('Create').click()
    // Go edit game
    cy.get('button[aria-controls="more-button-menu"]').click()
    cy.get('[data-testid="edit-menu-item"]').click()
    // Update game name
    cy.wait(100)
    cy.get('[data-testid="game-name-test"]').type('Test Change')
    cy.get('[data-testid="question-thumbnail"]').click()
    cy.get('[data-testid="question-thumbnail"]').click()
    // Edit question
    cy.wait(100)
    cy.get('[data-testid="question-title"]').type('Test Question')
    cy.get('[data-testid="textfield-A"]').type('Test Choice A')
    cy.get('[data-testid="checkbox-A"]').click()
    cy.get('[data-testid="textfield-B"]').type('Test Choice B')
    cy.get('[data-testid="checkbox-B"]').click()
    cy.get('[data-testid="fab"]').click()
    // Finish editing
    cy.wait(100)
    cy.get('button').contains('Finish Editing').click()
    // Start game
    cy.wait(100)
    cy.get('button').contains('start').click()
    cy.wait(100)
    cy.get('button').contains('Close').click()
    cy.wait(100)
    cy.get('button').contains('Stop').click()
    cy.wait(100)
    cy.get('button').contains('Yes').click()
    // Logout
    cy.get('button[aria-controls="menu-appbar"]').click()
    cy.get('[data-testid="test-link-Logout-small"]').click()
    // Log back
    cy.wait(100)
    cy.get('#email').type('Tester@gmail.com')
    cy.get('#password').type('123456')
    cy.get('button').contains('Sign In').click()
  })
})
