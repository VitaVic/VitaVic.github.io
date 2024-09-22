import express, { response } from 'express'
import { logger } from './middlewares/logger.mjs'

const app = express();

app.set('view engine', 'ejs')
app.use(logger)
app.get('/', (request, response) => {
  response.send('Welcome to my Cat Sticker Shop Fwiendly!!')
})

const PORT = 3000;
const happy = {name: "Happy Sticker!", description: "Vewy happwy stickew, happwy mew!"}
const sad = {name: "Sad Sticker :(", description: "Vewy sawd ://"}
const sample = {name: "Sample Text", description: "Sample Description"}
const stickers = {
  happy,
  sad,
  sample,
}


app.get('/stickers/:id', (request, response) => {
  const stickerId = request.params.id;
  const stickerName = stickers[`${stickerId}`].name;
  const stickerDescription = stickers[`${stickerId}`].description;
  response.render('productpage', {stickerName: stickerName, stickerDescription: stickerDescription})
  //response.send(`The sticker is ${stickerId} \nname: ${stickerName} \ndescription: ${stickerDescription}`)
})

app.get("/home", (request, response) => {
  response.render('home')
}) 

app.get("/plans", (request, response) => {
  response.send("I have so many plans!!")
})

app.get("/sample", (request, response) => {
  response.send("This is  sample page")
})

app.listen(PORT, () => {
  console.log(`Meow Meow!!\nWe are live on port: ${PORT}`)
})