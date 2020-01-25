import {home} from './home.js'
import {user} from './user.js'
import{treks} from './treks.js'

const app = Sammy('body', function(){
    this.use('Handlebars', 'hbs')

    this.get('/', home.home)

    this.get('/login', user.login)

    this.post('/login', user.postLogin)

    this.get('/register', user.register)

    this.post('/register', user.postRegister)

    this.get('/logout', user.logout)

    this.get('#/create', treks.create)

    this.post('#/create', treks.postCreate)

    this.get('#/details/:id', treks.details)

    this.get('#/edit/:id', treks.edit)

    this.post('#/edit/:id', treks.postEdit)

    this.get('#/delete/:id', treks.delete)

    this.get('#/like/:id', treks.like)

    this.get('#/profile', treks.profile)
})
app.run()