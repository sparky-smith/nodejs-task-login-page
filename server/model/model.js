const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    userName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})

const userDb = mongoose.model('loginDb', schema);
module.exports = userDb
