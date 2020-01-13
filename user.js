import {partials, sessionInfo, displayLoading, checkInput} from './helper.js'
import {put, post, get, del} from './requester.js'

export const user = {

    login: function () {
        this.loadPartials(partials)
        .partial('./templates/auth/login.hbs')
    },  

    postLogin: function (ctx){
        const {username, password} = ctx.params
        if (checkInput(username, password)) {
            alert('all dadnadn')
            return
        }
        post('user', 'login', {username, password}, 'Basic')
        .then(data=>{
            sessionInfo(data)
            ctx.redirect('/')  
        })
        .catch(console.error)
    },  

    register: function () {
        this.loadPartials(partials)
        .partial('./templates/auth/register.hbs')
    },

    postRegister: function (ctx) {
        const {username, password, rePassword} = ctx.params
        displayLoading()
        post('user', '', {username, password, rePassword}, 'Basic')
        .then(data=>{
            sessionInfo(data)
            ctx.redirect('/')  
        })
        .catch(()=>displayError('hhhh'))
    },

    logout: function (ctx) {
        post('user', '_logout', {}, 'Kinvey')
            .then(() => {
                sessionStorage.clear();
                ctx.redirect('/');
            })
            .catch(console.error);
    }
}