import { Router } from 'express'
import { Sticker } from "../models/sticker.mjs"
import { readablePrice } from "../helpers/stickers-view.mjs"

const router = Router()

router.get('/stickers', async (request, response) => {
    const stickerList = await Sticker.find({}).exec()
    response.render('products', { stickers: stickerList, readablePrice: readablePrice })
})

router.get('/stickers/search', async (request, response) => {      // Search on the sticker-list page
    const searchQuery = request.query.q
    const stickers = await Sticker.find({ name: searchQuery }).exec()
    response.render('products', { stickers: stickers, readablePrice: readablePrice })
})

router.get('/stickers/:id', async (request, response) => {     // Sticker product page     
    try {
        const stickerId = request.params.id
        const sticker = await Sticker.findOne({ id: stickerId }).exec()

        if (sticker != null) {
            response.render('productpage', { sticker: sticker, readablePrice: readablePrice })
        } else {
            response.render('error', { message: `404, ${stickerId} Sticker not found :(` })
        }

    } catch (error) {
        console.log(error)
        response.render('error', { message: "Something went wrong :(" })
    }
})

export default router