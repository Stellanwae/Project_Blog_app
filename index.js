const express = require('express')
const app = new  express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const path = require('path')
const newPostController = require('./controllers/newPost')
const homeControllers = require('./controllers/home')
const aboutController = require('./controllers/about')
const eachPostController = require('./controllers/eachPost')
const contactController = require('./controllers/contact')
const postController = require('./controllers/postingPost')
const validateMiddleWare = require('./middleware/validationMiddleWare')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const expressSession = require('express-session')
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
const logoutController = require('./controllers/logout')
const flash = require('connect-flash')


app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileUpload())
app.use('/posts/store', validateMiddleWare)
app.use(expressSession({
    secret: 'keyboard cat'
}))

app.use(flash())

global.loggedIn = null
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId
    // res.locals.flash = req.flash()
    next()
})



mongoose.connect('mongodb+srv://root:root@cluster0.4xnwovf.mongodb.net/BlogPostDB?retryWrites=true&w=majority')


PORT = process.env.PORT || 4000

app.get('/contact', contactController)

app.get('/about', aboutController)

app.get('/post/:id', eachPostController)

app.get('/posts/new', authMiddleware, newPostController)

app.post('/posts/store', authMiddleware, postController)

app.get('/', homeControllers)

app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)

app.post('/user/register', redirectIfAuthenticatedMiddleware, storeUserController)

app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)

app.post('/user/login', redirectIfAuthenticatedMiddleware, loginUserController)

app.get('/auth/logout', logoutController)

app.use((req, res) => res.render('notfound'))

app.listen(PORT, ()=>{
    console.log(`Listening to port ${PORT}`)
})
