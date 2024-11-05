import express, { response } from 'express'
import { logger } from './middlewares/logger.mjs'
import mongoose, { trusted } from 'mongoose';
import bodyParser from 'body-parser';
import 'dotenv/config';
import stickersRoutes from './controllers/stickers.mjs'
import homeRoutes from './controllers/home.mjs'
import adminRoutes from './controllers/admin/admin.mjs'
import createRoutes from './controllers/admin/create.mjs'
import editRoutes from './controllers/admin/edit.mjs'
import deleteRoutes from './controllers/admin/delete.mjs'
import simpleRoutes from './controllers/simple.mjs'


const app = express();
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.set('view engine', 'ejs')
app.use(logger)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('💽 Database connected'))
  .catch(error => console.error(error))
app.use(express.static("public"));


// <---- ROUTES ---->

app.use(homeRoutes)
app.use(stickersRoutes)
app.use(adminRoutes)
app.use(createRoutes)
app.use(editRoutes)
app.use(deleteRoutes)
app.use(simpleRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Meow Meow!!\nWe are live on port: ${process.env.PORT}`)
})