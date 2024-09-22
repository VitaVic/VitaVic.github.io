import express, { response } from 'express'

const app = express();
const PORT = 3000;
const happy = {name: "Happy Sticker!", description: "Vewy happwy stickew, happwy mew!"}
const sad = {name: "Sad Sticker :(", description: "Vewy sawd ://"}
const stickers = {
  happy,
  sad,
}

app.get('/', (request, response) => {
  response.send('Welcome to my Cat Sticker Shop Fwiendly!!')
})

app.get('/stickers/:id', (request, response) => {
  const stickerId = request.params.id;
  const stickerName = stickers[`${stickerId}`].name;
  const stickerDescription = stickers[`${stickerId}`].description;

  response.send(`The sticker is ${stickerId} \nname: ${stickerName} \ndescription: ${stickerDescription}`)
})

app.get("/home", (request, response) => {
  response.send('It feels like home...')
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