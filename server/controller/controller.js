var userDb = require('../model/model')
var taskDb = require('../model/taskModel')

const bcrypt = require('bcrypt')
const passport = require('passport')

const initializePassport = require('../passport/passport-config');
initializePassport();

exports.login = passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect:'/login',
    failureFlash:true
})

exports.register =  (req, res) => {
    if(!req.body){
          console.log('error where')
          return res.redirect('/register')
    }
    try{
        userDb.find({ email: req.body.email })
    .then(async data => {

        if(data.length==0){

        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const user = new userDb({
            userName:req.body.name,
            email:req.body.email,
            password:hashedPassword
        })
        user.save(user).then(data => {
            res.redirect('/login')
        }).catch(e => {
          res.redirect('/register')
        })
    }
    else{
        res.render('register', {error:"Email already exists!"})
    }})
    }catch(e){
          console.log(e)
          res.redirect('/register')
    }
}

exports.logout = (req, res, next)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
}

exports.createTask = (req, res, next) => {
    try{
        const user = new taskDb({
            id:req.params.id,
            title:req.body.title,
            description:req.body.description,
            duedate:req.body.duedate
        })
        user.save(user).then(data => {
            res.redirect('/')
        })
    
    }catch(e){
          console.log(e)
          res.redirect('/create-task')
    }
}

exports.updateTask = (req, res, next)=>{
    try{
        taskDb.findByIdAndUpdate({_id:req.params.id},req.body, (err,docs) =>{
            if(err){
                console.log("Something wrong!")
                next(err)
            }else{
                res.redirect("/")
            }
        } 
        )
    }catch(e){
        console.log(e)
        res.redirect('/update-task')
    }
}

exports.delete = (req, res, next) =>{
    taskDb.findByIdAndDelete({_id:req.params.id}, (err, docs)=>{
        if(err){
            console.log("Something went wrong!")
            next(err)
        }else{
            console.log("Deleted Successfully!")
            res.redirect("/")

        }
    })
}