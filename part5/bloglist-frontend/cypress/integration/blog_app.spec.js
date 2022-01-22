describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'John Doe',
      username: 'johndoe',
      password: 'johndoe321'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('johndoe')
      cy.get('#password').type('johndoe321')
      cy.get('#login').click()

      cy.contains('John Doe is logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('johndoe')
      cy.get('#password').type('wrongpass')
      cy.get('#login').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'John Doe logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('johndoe')
      cy.get('#password').type('johndoe321')
      cy.get('#login').click()
    })

    it('Menu of blogs creation can be opened', function () {
      cy.get('#createnewblog').click()

      cy.contains('create new blog')
      cy.contains('title')
      cy.contains('author')
      cy.contains('url')
      cy.contains('add')
    })

    it('A blog can be created', function () {
      cy.get('#createnewblog').click()

      cy.get('#title').type('Testing type new blog')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('https://testingwithcypress.com')
      cy.get('#addblog').click()

      cy.get('.notification')
        .should('contain', 'A new blog Testing type new blog by Cypress has been added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
    })

    describe('When a blog is created by an user', function () {
      beforeEach(function () {
        cy.get('#createnewblog').click()

        cy.get('#title').type('Testing type new blog')
        cy.get('#author').type('Cypress')
        cy.get('#url').type('https://testingwithcypress.com')
        cy.get('#addblog').click()
      })
      it('User can like a blog', function () {
        cy.get('.show').click()
        cy.get('#like-button').click()

        cy.contains('likes: 1')
      })

      it('User who did not create the note, cannot delete it', function () {
        cy.get('#logout-button').click()
        const anotheruser = {
          name: 'Lady Doe',
          username: 'ladydoe',
          password: 'ladydoe321'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', anotheruser)

        cy.get('#username').type('ladydoe')
        cy.get('#password').type('ladydoe321')
        cy.get('#login').click()

        cy.get('.show').click()
        cy.get('#remove-button').should('not.exist')

      })

      it('User who created the note, can delete it', function () {
        cy.get('.show').click()
        cy.get('#remove-button').click()

        cy.should('not.contain', 'Testing type new blog')
          .and('not.contain', 'Cypress')
          .and('not.contain', 'https://testingwithcypress.com')
      })
    })

    describe('Creating a few blogs', function () {
      beforeEach(function () {
        cy.login({
          name: 'John Doe',
          username: 'johndoe',
          password: 'johndoe321'
        })
        cy.createBlog({
          title: 'This is the first blog',
          author: 'Testing guy',
          url: 'https://testingmyapp.com',
          likes: 2,
        })
        cy.createBlog({
          title: 'This is the second blog',
          author: 'Testing guy',
          url: 'https://testingmyapp.com',
          likes: 3,
        })
        cy.createBlog({
          title: 'This is the third blog',
          author: 'Testing guy',
          url: 'https://testingmyapp.com',
          likes: 1,
        })
      })

      it('Blogs are orderer according to likes', function () {
        cy.get('.show:first').click()
        cy.get('.blog').first().should('contain', 'likes: 3')
      })
    })

  })

})