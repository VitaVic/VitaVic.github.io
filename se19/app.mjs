import express, { response } from 'express'
import { logger } from './middlewares/logger.mjs'
import bodyParser from 'body-parser';

const app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


app.set('view engine', 'ejs')
app.use(logger)
app.use(express.static("public"));

const PORT = 3000;

const happy = {name: "Happy Sticker!", description: "Vewy happwy stickew, happwy mew!"}
const sad = {name: "Sad Sticker :(", description: "Vewy sawd ://"}
const sample = {name: "Sample Text", description: "Sample Description"}
const stickers = {
  happy,
  sad,
  sample,
}

app.get('/', (request, response) => {
  response.redirect('/home')
})

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
  response.render('plans')
})

app.get("/legal", (request, response) => {
  response.render('legal')
})

app.post("/home", (request, response) => {
  response.sendStatus(200)
  const email = request.body['useremail']
  const REGEMAIL = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm;

  console.log(email)

  if(REGEMAIL.test(email) === true){
    console.log("is an Email")
  } else {
    console.log("is not Email")
  }
})

app.listen(PORT, () => {
  console.log(`Meow Meow!!\nWe are live on port: ${PORT}`)
})