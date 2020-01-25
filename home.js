import { partials, getUserInfo } from './helper.js'
import { get } from './requester.js'

export const home = {
    home: async function (ctx) {
        getUserInfo(ctx)
        if (ctx.loggedIn) {
            await get('appdata', 'treks')
                .then(data => {
                    data.sort((a,b)=>b.likes-a.likes)
                    ctx.data = data
                    ctx.loadPartials(partials)
                    .partial('./templates/home/home.hbs')
                    ctx.redirect("/#")
                })

        } else {
            ctx.loadPartials(partials)
                .partial('./templates/home/homeUnlog.hbs')

        }
    },
    redirect: async function (ctx) {
        getUserInfo(ctx)
        if (ctx.loggedIn) {
            await get('appdata', 'treks')
                .then(data => {
                    data.sort((a,b)=>b.likes-a.likes)
                    ctx.data = data
                    ctx.loadPartials(partials)
                    .partial('./templates/home/home.hbs')
                    ctx.redirect("/#")
                })

        } else {
            ctx.loadPartials(partials)
                .partial('./templates/home/homeUnlog.hbs')

        }
    }
}