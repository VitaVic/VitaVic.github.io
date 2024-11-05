import { Router } from 'express'
import { Sticker } from '../../models/sticker.mjs'
import 'dotenv/config';

const router = Router()

router.get('/edit/:id', async (request, response) => {     //Update sticker page route
    try {
        const stickerId = request.params.id
        const sticker = await Sticker.findOne({ id: stickerId }).exec()

        if (sticker != null) {
            response.render('edit', { sticker: sticker, message: "", isAuthenticated: false })
        } else {
            response.render('error', { message: `404, ${stickerId} Sticker not found :(` })
        }
    } catch (error) {
        console.log(error)
        response.render('error', { message: "Something went wrong :(" })
    }
})

router.post('/edit/:id/auth', async (request, response) => {
    const input = request.body['pwd']
    if (input === process.env.ADMINPWD) {
        const stickerId = request.params.id
        const sticker = await Sticker.findOne({ id: stickerId }).exec()
        response.render('edit', { sticker: sticker, message: "", isAuthenticated: true })
    }
})

router.post('/edited/:id', async (request, response) => {      //Route to get sticker updated
    try {
        const stickerId = request.params.id
        const newStickerData = request.body
        console.log(newStickerData)
        const sticker = await Sticker.findOneAndUpdate({ id: stickerId },
            {
                name: newStickerData.name,
                id: newStickerData.id,
                priceInCents: newStickerData.priceInCents
            },
            { new: true }
        )
        response.redirect(`/stickers/${sticker.id}`)
    } catch (error) {
        console.log(error)
    }
})


export default router