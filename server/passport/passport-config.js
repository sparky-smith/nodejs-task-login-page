var userDb = require('../model/model')
const localStrategy = require('passport-local')
// const bcrypt = require('bcrypt')
const passport = require('passport')


function initialize(){
    const authenticateUser = async (email, password, done) => {
        userDb.find({ email: email })
        .then( data => {
        if(data.length == 0){
            return done(null, false, {message: "No user with that email!"})
        }
        try{
            if(password===data[0].password) {
                return done(null, data)
            }else{
                return done(null, false, {message:"Password incorrect"})
            }
        }catch(e){
            return done(e)
        }})
    }

    passport.use(new localStrategy({ usernameField: 'email'}, authenticateUser))
    passport.serializeUser((data, done) =>{
        done(null, data[0]._id)
    })
    passport.deserializeUser((id=data[0]._id, done) =>{
        return done(null, id)
    })
}

module.exports = initialize