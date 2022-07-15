const mongoose = require('mongoose');

const connectDb = () =>{
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() =>{
        console.log("Connection Successful")
    }).catch((e) => console.log(e))
}




module.exports = connectDb;