import { partials, sessionInfo, checkInput, passwordCheck, displayError  } from './helper.js'
import { post } from './requester.js'

export const user = {

    login: function (ctx) {
        ctx.loadPartials(partials)
            .partial('./templates/auth/login.hbs')
    },

    postLogin: function (ctx) {
        const { username, password } = ctx.params
        if (checkInput(username, password)) {
            alert('All inputs must be field!')
            return
        }
        post('user', 'login', { username, password }, 'Basic')
            .then(data => {
                sessionInfo(data)
                ctx.redirect('#/')
            })
            .catch(console.error);
    },

    register: function (ctx) {
        ctx.loadPartials(partials)
            .partial('./templates/auth/register.hbs')
    },

    postRegister: function (ctx) {
        const { username, password, rePassword } = ctx.params

        if (checkInput(username, password, rePassword)) {
            displayError('All inputs must be field!');
            return;
        }

        if (passwordCheck(password, rePassword)) {
            post('user', '', { username, password, rePassword }, 'Basic')
                .then(data => {
                    sessionInfo(data)
                    ctx.redirect('#/')
                })
                .catch(console.error);
        }
    },

    logout: function (ctx) {
        post('user', '_logout', {}, 'Kinvey')
            .then(() => {
                sessionStorage.clear();
                ctx.redirect('#/');
            })
            .catch(console.error);
    }
}