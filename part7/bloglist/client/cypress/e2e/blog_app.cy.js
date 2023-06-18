describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'test',
      name: 'testName',
      password: 'test',
    });
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'test2',
      name: 'testName2',
      password: 'test2',
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

    describe('and several blogs exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'testTitle1',
          author: 'testName',
          url: 'testUrl1',
        });
        cy.createBlog({
          title: 'testTitle2',
          author: 'testName',
          url: 'testUrl2',
        });
        cy.createBlog({
          title: 'testTitle3',
          author: 'testName',
          url: 'testUrl3',
        });
        cy.visit('http://localhost:3000');
      });

      it('blog can be liked', function () {
        cy.get('.blog').first().find('button').contains('View').click();
        cy.get('.blog').first().find('button').contains('Like').click();
        cy.get('.blog').first().contains(/^1 $/);
      });

      it('blog can be deleted', function () {
        cy.get('.blog').first().find('button').contains('View').click();
        cy.get('.blog').first().find('button').contains('Delete').click();
        cy.get('.blog').should('have.length', 2);
      });

      it('blogs are sorted by like count', function () {
        cy.get('.blog').eq(0).find('button').contains('View').click();
        cy.get('.blog').eq(1).find('button').contains('View').click();
        cy.get('.blog').eq(2).find('button').contains('View').click();

        cy.get('.blog')
          .contains('testTitle1')
          .parent()
          .find('button')
          .contains('Like')
          .click()
          .wait(1000)
          .click()
          .wait(1000)
          .click()
          .wait(1000);
        cy.get('.blog')
          .contains('testTitle2')
          .parent()
          .find('button')
          .contains('Like')
          .click()
          .wait(1000)
          .click()
          .wait(1000);
        cy.get('.blog')
          .contains('testTitle3')
          .parent()
          .find('button')
          .contains('Like')
          .click()
          .wait(1000);

        cy.get('.blog').eq(0).contains('testTitle1');
        cy.get('.blog').eq(1).contains('testTitle2');
        cy.get('.blog').eq(2).contains('testTitle3');

        cy.get('.blog')
          .contains('testTitle2')
          .parent()
          .find('button')
          .contains('Like')
          .click()
          .wait(1000)
          .click()
          .wait(1000)
          .click()
          .wait(1000);
        cy.get('.blog')
          .contains('testTitle3')
          .parent()
          .find('button')
          .contains('Like')
          .click()
          .wait(1000)
          .click()
          .wait(1000)
          .click()
          .wait(1000);

        cy.get('.blog').eq(0).contains('testTitle2');
        cy.get('.blog').eq(1).contains('testTitle3');
        cy.get('.blog').eq(2).contains('testTitle1');
      });

      describe('When logged in as another user', function () {
        beforeEach(function () {
          cy.get('#logout-btn').click();
          cy.login({ username: 'test2', password: 'test2' });
          cy.visit('http://localhost:3000');
        });

        it("can't see delete button of the other user blog", function () {
          // should not see delete button
          cy.get('.blog').first().find('button').contains('View').click();
          cy.get('.blog')
            .first()
            .find('button')
            .should('not.contain', 'Delete');
        });
      });
    });
  });
});
