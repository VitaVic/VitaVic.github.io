
# Fwiendly is a website to buy fwiendly stickers.
**The current development is in the "se19" folder; the Index.html file that exists in the main folder is just a placeholder!**

# Things to note

## Technology used

- Everything uses node, express, some middleware and mongoDB.
- To be able to run it on your device, run: **"npm ci" inside the /se19 folder** since node_modules is inside .gitignore
- Only god knows how I connected to mongoDB (I am sure it's actually simple, but I can't recreate the process on my windows machine and that creates anxiety :)))))) )

## Pages
- "/" and "/home" is the homepage/landing page, where you can enter your email to sign up! If you like, you can try it out!
- "/plans" and "/legal" are just simple content pages.
- "/stickers" is the list of ALL the stickers that exist!
  - Do none exist? Create some!
  - Do some exist? Change them or delete them! The choice is yours!
- If you enter anything else, it will redirect you to "/error" which is currently just a 404 page.

## Project structure
Important: Everything is under "/se19".

- Backend is under "/app.mjs".
- Templates are under "/views/..."
- CSS, images and fonts are under "/public/..."
- Middleware is under "/middlewares/..."
- Node modules are under "/node_modules/...". **You are not seeing it? Run npm ci in "/se19"**
- All legacy pages (before templating) are under "/legacy/..."

Have fun! :D
