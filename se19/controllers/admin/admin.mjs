import { Router } from 'express'
import { Sticker } from '../../models/sticker.mjs'
import { readablePrice } from '../../helpers/stickers-view.mjs';
import 'dotenv/config';

const router = Router()

router.get('/admin', async (request, response) => {     // Sticker-list Route
    const stickerList = await Sticker.find({}).exec()
    response.render('adminpanel', { stickers: stickerList, readablePrice: readablePrice, isAuthenticated: false })
})

router.post('/admin/auth', async (request, response) => {
    const input = request.body['pwd']
    if (input === process.env.ADMINPWD) {
        const stickerList = await Sticker.find({}).exec()
        response.render('adminpanel', { stickers: stickerList, readablePrice: readablePrice, isAuthenticated: true })
    }
})

export default router