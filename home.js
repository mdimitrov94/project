import {partials, getUserInfo} from './helper.js'

export const home = {
    home: function (ctx) {
        getUserInfo(ctx)
        this.loadPartials(partials)
        .partial('./templates/home/home.hbs')

    }
}