import express, { response } from 'express'
import { logger } from './middlewares/logger.mjs'
import mongoose, { trusted } from 'mongoose';
import bodyParser from 'body-parser';
import { readablePrice } from './helpers/stickers-view.mjs';
import { body } from 'express-validator';


const app = express();
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.set('view engine', 'ejs')
app.use(logger)
mongoose.connect('mongodb://127.0.0.1:27017/stickershop')
  .then(() => console.log('💽 Database connected'))
  .catch(error => console.error(error))
app.use(express.static("public"));

const PORT = 3000;

//Email Schema
const emailSchema = new mongoose.Schema({
  emailAddress: { type: String, required: true, unique: true }
})
const Email = mongoose.model('Email', emailSchema)

//Sticker Schema
const stickerSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  priceInCents: { type: Number, required: true },
  isInStock: { type: Boolean, default: true }
})
const Sticker = mongoose.model('Sticker', stickerSchema)

app.get('/', (request, response) => {
  response.redirect('/home')
})

app.get('/edit/:slug', async(request, response) => {
  try {
    const stickerId = request.params.slug
    const sticker = await Sticker.findOne({ slug: stickerId }).exec()

    if (sticker != null) {
      response.render('edit', { sticker: sticker, message: "" })
    } else {
      response.render('error', { message: `404, ${stickerId} Sticker not found :(` })
    }
  } catch (error) {
    console.log(error)
    response.render('error', { message: "Something went wrong :(" })
  }
})

app.post('/edited/:slug', async (request, response) => {
  try {
    const stickerSlug = request.params.slug
    const newStickerData = request.body
    console.log(newStickerData)
    const sticker = await Sticker.findOneAndUpdate( {slug: stickerSlug}, 
      {
        name: newStickerData.name,
        slug: newStickerData.slug,
        priceInCents: newStickerData.priceInCents
      },
      { new: true }
    )
    response.redirect(`/stickers/${sticker.slug}`)
  } catch (error) {
    console.log(error)
  }
})

app.get('/create', (request, response) => {
  response.render('create', { message: "" })
})

app.post('/created', async (request, response) => {
  try {
    const sticker = new Sticker({
      slug: request.body.slug,
      name: request.body.name,
      priceInCents: request.body.priceInCents,
    })
    await sticker.save().catch((error) => {
      if (error.code === 11000) {
        throw new Error(
          `Slug ${request.body.name} already exists.`
        )
      }
    })
    response.render('create', { message: "Sticker has been created! :3" })
  } catch (error) {
    console.log(error)
    response.render('create', { message: error })
  }
})

app.get('/stickers', async (request, response) => {
  const stickerList = await Sticker.find({}).exec()
  response.render('products', { stickers: stickerList, readablePrice: readablePrice })
})

app.get('/stickers/search', async (request, response) => {
  const searchQuery = request.query.q
  const stickers = await Sticker.find({name: searchQuery}).exec()
  response.render('products', { stickers: stickers, readablePrice: readablePrice })
})

app.get('/stickers/:id', async (request, response) => {
  try {
    const stickerId = request.params.id
    const sticker = await Sticker.findOne({ slug: stickerId }).exec()

    if (sticker != null) {
      response.render('productpage', { stickerName: sticker.name, stickerDescription: sticker.priceInCents })
    } else {
      response.render('error', { message: `404, ${stickerId} Sticker not found :(` })
    }

  } catch (error) {
    console.log(error)
    response.render('error', { message: "Something went wrong :(" })
  }
})

app.get("/home", (request, response) => {
  response.render('home', { message: "" })
})

app.get("/plans", (request, response) => {
  response.render('plans')
})

app.get("/legal", (request, response) => {
  response.render('legal')
})

app.post("/submit", async (request, response) => {
  const email = request.body['useremail']
  const REGEMAIL = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm;

  if (REGEMAIL.test(email) === true) {
    try {
      const userEmail = new Email({
        emailAddress: email
      })

      await userEmail.save()

      response.render('home', { message: "You are signed up! Thank u uwu" })
    } catch (error) {
      console.log(error)
      response.render('home', { message: "OnO something went wrong pwp Please try again later!" })
    }

  } else {
    response.render('home', { message: "Error: Not an email, please check and try again!" })
  }
})

app.all('*', (request, response) => {
  response.render('error', { message: "404, page not found :(" })
})

app.listen(PORT, () => {
  console.log(`Meow Meow!!\nWe are live on port: ${PORT}`)
})