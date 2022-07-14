const loginDb = require('../model/model')
const taskDb = require('../model/taskModel')


exports.homeRoute = (req, res) =>{
    loginDb.find({_id:req.user}).then(data =>{
        console.log(data)
        taskDb.find({id:req.user}).then(user =>{
            console.log(user)
            res.render('index',  {name:data[0].userName,id:req.user,user:user})
        })
    })
}
exports.login = (req, res) =>{
    res.render('login')
    
}
exports.register = (req, res) =>{
    res.render('register', {error:""})
    
}
exports.createTask = (req, res) =>{
    res.render('createTask')
    
}
exports.updateTask = (req, res) =>{
    taskDb.find({_id:req.params.id}).then(user =>{
        res.render('updateTask',  {user:user[0]})
    })
}
exports.delete = (req, res) =>{
    // taskDb.find({_id:req.params.id}).then(user =>{
        res.render('delete',  {id:req.param.id})
    // })
}

