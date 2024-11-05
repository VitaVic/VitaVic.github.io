import mongoose from "mongoose"

const emailSchema = new mongoose.Schema({
    emailAddress: { type: String, required: true, unique: true }
})
const Email = mongoose.model('Email', emailSchema)

export {
    Email
}