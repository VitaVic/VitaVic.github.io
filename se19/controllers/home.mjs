import { Router } from 'express'
import { Email } from '../models/email.mjs'

const router = Router()

router.get('/', (request, response) => {
    response.redirect('/home')
})

router.get("/home", (request, response) => {
    response.render('home', { message: "" })
})

router.post("/submit", async (request, response) => {      //Email submission route
    const email = request.body['useremail']
    const REGEMAIL = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm;
    console.log(email)

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

export default router