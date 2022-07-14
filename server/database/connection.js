const mongoose = require('mongoose');

const connectDb = async()=>{
    try{
        const con = await mongoose.connect('mongodb://127.0.0.1:27017/Login', {
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log(`MongoDb connected: ${con.connection.host}`)
    }catch(err){
        console.log(err);
        process.exit(t);
    }
}



module.exports = connectDb;