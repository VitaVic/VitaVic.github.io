const stickerSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true},
    name: { type: String, required: true, unique: true},
    priceInCents: { type: Number, required: true},
    stockInUnits: { type: Number, required: true},
    isInStock: { type: String, default: true, required: true},
})

const Sticker = mongoose.model('Sticker', stickerSchema)