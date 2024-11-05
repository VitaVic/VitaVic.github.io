import { Router } from 'express'
import { Sticker } from '../../models/sticker.mjs'
import 'dotenv/config';

const router = Router()

router.get('/delete/:id', async (request, response) => {     //Route to get sticker deleted
    try {
        const stickerId = request.params.id
        await Sticker.findOneAndDelete({ id: stickerId })
        response.redirect(`/admin`)
    } catch (error) {
        console.log(error)
    }
})

export default router