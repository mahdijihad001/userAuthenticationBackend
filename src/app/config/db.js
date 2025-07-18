const mongoose = require("mongoose");
// authenticationSyatem001
// pO4EFNizRlEdX4Y2

const ConnectDb = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI , {});
        console.log("MongoDb Connected");
        // console.log(require('crypto').randomBytes(64).toString('hex'))
    } catch (error) {
        console.log("MongoDb Connection error");
        process.exit(1)
    }
};


module.exports = ConnectDb;