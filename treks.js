import { partials, getUserInfo, displayError, displaySucces, displayLoading } from './helper.js'
import { put, post, get, del } from './requester.js'

export const treks = {
    create: function (ctx) {
        getUserInfo(ctx)
        ctx.loadPartials(partials)
            .partial('../templates/treks/create.hbs')
    },
    postCreate: function (ctx) {
        const { location, dateTime, description, imageURL } = ctx.params
        getUserInfo(ctx)
        post('appdata', 'treks', {
            location,
            dateTime,
            description,
            imageURL,
            organizer: ctx.name,
            likes: 0
        })
        displaySucces('Trek created successfully')
        ctx.redirect('#/')
    },
    details: async function (ctx) {
        getUserInfo(ctx)
        await get('appdata', `treks/${ctx.params.id}`)
            .then(data => {
                ctx.data = data
                
                ctx.creator = ctx.data._acl.creator === ctx.id
                ctx.loadPartials(partials)
                    .partial('../templates/treks/description.hbs')
            })
    },
    edit: async function (ctx) {
        await get('appdata', `treks/${ctx.params.id}`)
            .then(data => {
                ctx.data = data
                ctx.loadPartials(partials)
                    .partial('../templates/treks/edit.hbs')
            })
    },
    postEdit: function (ctx) {
        const { location, dateTime, description, imageURL, organizer, likes } = ctx.params
        put('appdata', `treks/${ctx.params.id}`, {
            location,
            dateTime,
            description,
            imageURL,
            organizer,
            likes
        })
        displaySucces('Trek edited successfully')
        ctx.redirect(`#/details/${ctx.params.id}`)
    },
    delete: function(ctx) {
        getUserInfo(ctx)
        del('appdata', `treks/${ctx.params.id}`)
        displaySucces('You closed the trek successfully')
        ctx.redirect('#/')
    },
    like: async function(ctx) {
        getUserInfo(ctx)
        await get('appdata', `treks/${ctx.params.id}`)
            .then(data => {

                delete data._id
                data.likes++
                put('appdata', `treks/${ctx.params.id}`,
                    {
                        location: data.location,
                        dateTime: data.dateTime,
                        description: data.description,
                        imageURL: data.imageURL,
                        organizer: data.organizer,
                        likes: data.likes
                    })
                    .then(() => {
                        displaySucces('You liked the trek successfully')
                        ctx.redirect(`#/details/${ctx.params.id}`)})
                    
            })
    },
    profile: async function (ctx) {
        getUserInfo(ctx)
        await get('appdata', 'treks')
            .then(data => {
                ctx.treks = []
                Object.values(data)
                    .forEach(e => {
                        if (e._acl.creator === ctx.id) {
                            ctx.treks.push(e.location)
                        }
                    })
            })
        ctx.loadPartials(partials)
            .partial('../templates/treks/profile.hbs')

    }
}
    
