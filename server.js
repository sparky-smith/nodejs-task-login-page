if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express');
const app = express()
const passport = require('passport')
const session = require('express-session')
const flash = require('express-flash')
const methodOverride = require('method-override')


app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))

app.use(passport.initialize())
app.use(passport.session())

const db = require('./server/database/connection')
db();

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }) )

app.use(methodOverride('_method'))

app.use('/', require('./server/routes/router') )

PORT = process.env.PORT

app.listen(PORT || 8080, () =>{
    console.log(`Server Started at http://localhost:${PORT}`)
})