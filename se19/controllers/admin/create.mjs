import { Router } from 'express'
import { Sticker } from '../../models/sticker.mjs'
import 'dotenv/config';

const router = Router()

router.get('/create', (request, response) => {     // Sticker creation page route
    response.render('create', { message: "", isAuthenticated: false })
})

router.post('/create/auth', async (request, response) => {
    const input = request.body['pwd']
    if (input === process.env.ADMINPWD) {
        response.render('create', { message: "", isAuthenticated: true })
    }
})

router.post('/created', async (request, response) => {     //Route to get sticker created
    try {
        const sticker = new Sticker({
            id: request.body.id,
            name: request.body.name,
            priceInCents: request.body.priceInCents,
        })
        await sticker.save().catch((error) => {
            if (error.code === 11000) {
                throw new Error(
                    `ID ${request.body.name} already exists.`
                )
            }
        })
        response.render('create', { message: "Sticker has been created! :3", isAuthenticated: true })
    } catch (error) {
        console.log(error)
        response.render('create', { message: error, isAuthenticated: true })
    }
})

export default router