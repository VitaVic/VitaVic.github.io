import mongoose from "mongoose"

const stickerSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    priceInCents: { type: Number, required: true },
    isInStock: { type: Boolean, default: true }
})

const Sticker = mongoose.model('Sticker', stickerSchema)

export {
    Sticker
}