import express from 'express'

const app = express();
const PORT = 3000;

app.get('/', (request, response) => {
  response.send('Welcome to my Cat Sticker Shop Fwiendly!!')
})

app.listen(PORT, () => {
  console.log('Meow Meow!!\nWe are live on port:', PORT)
})