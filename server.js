if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express');
const app = express()
const passport = require('passport')
const session = require('express-session')
const flash = require('express-flash')
const methodOverride = require('method-override')
// const router = 

app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))

app.use(passport.initialize())
app.use(passport.session())


const connectDb = require('./server/database/connection')
connectDb();

// const initializePassport = require('./passport-config');
// // const { serializeUser } = require('passport/lib');
// initializePassport(passport , email => users.find(user=> user.email===email),
// id=> users.find(user => user.id === id))

// const users = []

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }) )

app.use(methodOverride('_method'))

app.use('/', require('./server/routes/router') )




app.listen(3000, () =>{
    console.log(`Server Started at http://localhost:3000`)
})