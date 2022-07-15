const express = require('express');
const route = express.Router();
const services = require('../services/render')
const controller = require('../controller/controller')
// const bcrypt = require('bcrypt')

// const users = []


function checkAuthentication(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
    return res.redirect('/')
    }
    next()
}




route.get('/', checkAuthentication, services.homeRoute)

route.get('/login',checkNotAuthenticated, services.login)

route.get('/register',checkNotAuthenticated, services.register)

route.post('/login',checkNotAuthenticated, controller.login)
route.post('/register',checkNotAuthenticated ,controller.register)

route.delete('/logout', controller.logout)

route.get('/create-task/:id', services.createTask)
route.post('/create-task/:id', controller.createTask)

route.get('/update-task/:id', services.updateTask)
route.post('/update-task/:id', controller.updateTask)

route.get('/delete-task/:id', services.delete)
route.post('/delete-task/:id', controller.delete)

module.exports = route;
