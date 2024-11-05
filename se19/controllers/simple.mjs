import { Router } from 'express'

const router = Router()

router.get("/plans", (request, response) => {
    response.render('plans')
})

router.get("/legal", (request, response) => {
    response.render('legal')
})

router.all('*', (request, response) => {
    response.render('error', { message: "404, page not found :(" })
})

export default router