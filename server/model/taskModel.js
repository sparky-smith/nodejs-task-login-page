const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    id:{
        type:String,
        require:true,
    },
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    duedate:{
        type:String,
        require:true
    }
})

const userDb = mongoose.model('taskDb', schema);
module.exports = userDb
