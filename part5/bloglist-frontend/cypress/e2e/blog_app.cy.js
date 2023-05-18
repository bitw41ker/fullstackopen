describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'test',
      name: 'testName',
      password: 'test',
    });
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Log in');
    cy.contains('Username');
    cy.contains('Password');
    cy.contains('Login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('test');
      cy.get('#password').type('test');
      cy.get('#login-btn').click();
      cy.contains('testName logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('test');
      cy.get('#password').type('12345');
      cy.get('#login-btn').click();
      cy.contains('Wrong username or password');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'test', password: 'test' });
    });

    it('A blog can be created', function () {
      cy.get('#new-note-btn').click();
      cy.get('#note-title').type('testTitle');
      cy.get('#note-author').type('testAuthor');
      cy.get('#note-url').type('testUrl');
      cy.get('#create-note-btn').click();

      cy.contains('A new blog testTitle by testAuthor added');
      cy.get('.blog').last().contains('testTitle');
      cy.get('.blog').last().contains('testAuthor');
      cy.get('.blog').last().find('button').contains('View').click();

      cy.get('.blog').last().find('button').contains('Hide');
      cy.get('.blog').last().contains('testUrl');
      cy.get('.blog').last().contains('0');
      cy.get('.blog').last().contains('testAuthor');
      cy.get('.blog').last().find('button').contains('Delete');
    });
  });
});
