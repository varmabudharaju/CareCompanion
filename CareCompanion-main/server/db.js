require('dotenv').config();
const mongoose = require('mongoose');

module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,


    };

try{
    console.log("MongoDB Connection String:", process.env.mongo_URI);
    mongoose.connect(process.env.mongo_URI,connectionParams);
    console.log("Connected to the database succesfully")

}catch(error){
    console.log(error);
    console.log("couldn't connect to the database");
}

}

