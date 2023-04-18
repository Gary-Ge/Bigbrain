describe('template spec', () => {
  it('passes', () => {
    // Visit the website and register
    cy.visit('http://localhost:3000')
    cy.wait(100)
    cy.get('a[href="/register"]').contains('No account? Sign Up Now!').click()
    cy.get('#name').type('Test Name')
    cy.get('#email').type('Sad@gmail.com')
    cy.get('#password').type('123456')
    cy.get('button').contains('Sign Up').click()
    // Create a new game
    cy.wait(100)
    cy.get('[data-testid="add-card-action-area"]').click()
    cy.get('#game-name').type('Test Game')
    cy.get('button').contains('Create').click()
    // Edit the game
    cy.wait(100)
    cy.get('button[aria-controls="more-button-menu"]').click()
    cy.get('[data-testid="edit-menu-item"]').click()
    // Add one question
    cy.wait(100)
    cy.get('[data-testid="add-question-large"]').click()
    // Delete the added question
    cy.get('[data-testid="question-thumbnail"]').contains('Question 2').siblings('button').click()
    cy.get('[data-testid="question-thumbnail"]').click()
    // Edit the question
    cy.wait(100)
    cy.get('[data-testid="question-title"]').type('Test Question')
    cy.get('[data-testid="textfield-A"]').type('Test Choice A')
    cy.get('[data-testid="checkbox-A"]').click()
    cy.get('[data-testid="textfield-B"]').type('Test Choice B')
    cy.get('[data-testid="checkbox-B"]').click()
    cy.get('[data-testid="fab"]').click()
    cy.wait(100)
    cy.get('[data-testid="game-type-selector"]').click()
    cy.get('[data-testid="test-multi-choice"]').click()
    cy.get('[data-testid="test-duration"]').type('1')
    cy.get('[data-testid="test-points"]').type('1.5')
    cy.get('button').contains('Finish Editing').click()
    // Start the game
    cy.wait(100)
    cy.get('button').contains('start').click()
    cy.get('button').contains('Close').click()
    cy.get('button').contains('Admin').click()
    // Advance the game
    cy.wait(100)
    cy.get('[data-testid="test-advance"]').click()
    cy.wait(2000)
    cy.get('[data-testid="test-stop"]').click()
    // Go back to dashboard
    cy.get('button[aria-controls="menu-appbar"]').click()
    cy.get('[data-testid="test-link-Dashboard-small"]').click()
    // Logout
    cy.wait(100)
    cy.get('button[aria-controls="menu-appbar"]').click()
    cy.get('[data-testid="test-link-Logout-small"]').click()
  })
})