const mongoose  = require("mongoose");


const URI = process.env.DB_URL

const DBConnect  = async()=>{
    try {
       await mongoose.connect(URI);
       console.log("Connection Success") 
    } catch (error) {
        console.log("Connection Failed");
    }

}
module.exports = DBConnect;