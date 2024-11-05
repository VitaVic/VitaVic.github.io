
# Fwiendly is a website to buy fwiendly stickers.

Live Version: [Fwiendly website](fwiendly.com).
**The current development is in the "se19" folder**

# Things to note

## Getting Started
Everything uses node, express, some middleware and mongoDB.
1. To be able to run it on your device, run: **"npm ci" inside the /se19 folder** since node_modules is inside .gitignore
2. Add .env file inside of /se19. Add 3 variables: MONGODB_URI="" (Fill with your local MongoDB Address), PORT="3000" (or any other port, your choice really), ADMINPWD="" (fill with any password you want. You need it to access admin pages and no it's not a bug that it asks for the password a lot.)

## Pages
- "/" and "/home" is the homepage/landing page, where you can enter your email to sign up! If you like, you can try it out!
- "/plans" and "/legal" are just simple content pages.
- "/stickers" is the list of ALL the stickers that exist!
  - Do none exist? Create some inside the admin panel!
  - Do some exist? Open them!
- "/admin" will ask you for a password that you've set. (you can find a link to it in the footer.)
  - There you can create, edit and delete stickers :)
- If you enter anything else, it will redirect you to "/error" which is currently just a 404 page.

## ToDos
There are lot's of plans to improve the website. Here are some of them:
1. Image Upload for stickers
2. Description for stickers
3. Session tokens and cookies for less annoying security
4. Favourite stickers so you can buy them when they are out
5. Cart and payment logic
6. Reworking everything with material design and react.

Have fun! :D
