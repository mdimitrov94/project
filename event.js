import { partials, sessionInfo, getUserInfo, displayError, displaySucces, displayLoading } from './helper.js'
import { put, post, get, del } from './requester.js'

export const event = {
    loadEvents: async function (ctx) {
        getUserInfo(ctx)
        await get('appdata', 'events', '')
            .then(data => {
                displayLoading()
                data.sort((a, b) => b.peopleInterestedIn - a.peopleInterestedIn)
                ctx.info = data
                partials['error'] = './templates/home/home-error.hbs'
                ctx.loadPartials(partials)
                    .partial('./templates/event/eventholder.hbs')


            }).catch(()=>displayError('You have to register to enter the page'))
    },
    create: function (ctx) {
        getUserInfo(ctx)
        this.loadPartials(partials)
            .partial('./templates/event/create.hbs')
    },
    postCreate: function (ctx) {
        getUserInfo(ctx)
        const { dateTime, description, imageURL, name } = ctx.params
        post('appdata', 'events', {
            dateTime,
            description,
            imageURL,
            name,
            organizer: ctx.name,
            peopleInterestedIn: 0,
            joined: []
        })
        ctx.redirect('/events')
    },
    details: async function (ctx) {
        getUserInfo(ctx)
        await get('appdata', `events/${ctx.params.id}`)
            .then(data => {
                ctx.info = data
                ctx.creator = ctx.info._acl.creator === ctx.id
                ctx.liked = true
                if (data.joined.includes(ctx.id)) {
                    ctx.liked = false
                }
                ctx.loadPartials(partials)
                    .partial('../templates/event/details.hbs')
            })

    },
    delete: async function (ctx) {
        await del('appdata', `events/${ctx.params.id}`)
            .then(() => {
                console.log('haha');
                
                displaySucces("Successfully deleted!")
                ctx.redirect('/events')})
    },
    edit: function (ctx) {
        getUserInfo(ctx)
        get('appdata', `events/${ctx.params.id}`)
            .then(data => {
                ctx.info = data
                ctx.loadPartials(partials)
                    .partial('../templates/event/edit.hbs')
            })
    },
    postEdit: function (ctx) {
        get('appdata', `events/${ctx.params.id}`)
            .then(data => {
                put('appdata', `events/${ctx.params.id}`,
                    {
                        dateTime: ctx.params.dateTime,
                        description: ctx.params.description,
                        imageURL: ctx.params.imageURL,
                        name: ctx.params.name,
                        organizer: data.organizer,
                        peopleInterestedIn: data.peopleInterestedIn
                    })
            }).then(()=>ctx.redirect(`/details/${ctx.params.id}`))

    },
    like: async function (ctx) {
getUserInfo(ctx)
        await get('appdata', `events/${ctx.params.id}`)
            .then(data => {

                delete data._id
                data.peopleInterestedIn++
                data.joined.push(ctx.id)


                put('appdata', `events/${ctx.params.id}`,
                    {
                        dateTime: data.dateTime,
                        description: data.description,
                        imageURL: data.imageURL,
                        name: data.name,
                        organizer: data.organizer,
                        peopleInterestedIn: data.peopleInterestedIn,
                        joined: data.joined
                    })
                    .then(() => ctx.redirect(`/events`))
            })
    },
    profile: async function (ctx) {
        getUserInfo(ctx)
        await get('appdata', 'events')
            .then(data => {
                ctx.events = []
                Object.values(data)
                    .forEach(e => {
                        if (e._acl.creator === ctx.id) {
                            ctx.events.push(e.name)
                        }
                    })
            })
        ctx.loadPartials(partials)
            .partial('./templates/home/profile.hbs')

    }
}
